#!/usr/bin/env tsx
/**
 * Build-time binary fetcher.
 *
 * Populates `resources/` with the runtime binaries the app needs, for the
 * CURRENT build platform only (so each installer only carries its own binaries):
 *   - yt-dlp   -> downloaded from the yt-dlp GitHub latest release
 *   - deno     -> downloaded (zip) from the denoland/deno GitHub latest release
 *   - ffmpeg   -> copied from the `ffmpeg-static` npm package
 *   - ffprobe  -> copied from the `@ffprobe-installer/ffprobe` npm package
 *
 * yt-dlp additionally auto-updates itself at runtime (see ensure-ytdlp.ts); deno
 * and ffmpeg/ffprobe are pinned and only refreshed by re-running this script.
 *
 * These binaries are gitignored — run `npm run fetch-binaries` before building.
 */
import AdmZip from 'adm-zip'
import { createRequire } from 'node:module'
import { createWriteStream } from 'node:fs'
import { chmod, copyFile, mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const RESOURCES_DIR = join(__dirname, '..', 'resources')

const IS_WIN = process.platform === 'win32'
const EXE = IS_WIN ? '.exe' : ''

type Versions = Record<string, string>

/** Download a URL to a temp file then atomically rename into place. */
async function download(url: string, destPath: string): Promise<void> {
  const tmpPath = `${destPath}.download`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status} for ${url}`)
    await pipeline(
      Readable.fromWeb(res.body as NodeReadableStream<Uint8Array>),
      createWriteStream(tmpPath)
    )
    await rename(tmpPath, destPath)
  } catch (err) {
    await rm(tmpPath, { force: true }).catch(() => {})
    throw err
  }
}

async function latestTag(repo: string): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) throw new Error(`release API HTTP ${res.status} for ${repo}`)
  return ((await res.json()) as { tag_name: string }).tag_name
}

async function sizeMB(path: string): Promise<string> {
  const { size } = await stat(path)
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

// --- yt-dlp -----------------------------------------------------------------

function ytDlpAsset(): string {
  if (process.platform === 'darwin') return 'yt-dlp_macos'
  if (IS_WIN) return 'yt-dlp.exe'
  return process.arch === 'arm64' ? 'yt-dlp_linux_aarch64' : 'yt-dlp_linux'
}

async function fetchYtDlp(versions: Versions): Promise<void> {
  const dest = join(RESOURCES_DIR, `yt-dlp${EXE}`)
  const tag = await latestTag('yt-dlp/yt-dlp').catch(() => 'latest')
  process.stdout.write(`  yt-dlp (${tag}) ... `)
  await download(`https://github.com/yt-dlp/yt-dlp/releases/latest/download/${ytDlpAsset()}`, dest)
  if (!IS_WIN) await chmod(dest, 0o755)
  versions['yt-dlp'] = tag
  console.log(`ok (${await sizeMB(dest)})`)
}

// --- deno -------------------------------------------------------------------

function denoAsset(): string {
  const { platform, arch } = process
  if (platform === 'darwin') {
    return arch === 'arm64' ? 'deno-aarch64-apple-darwin.zip' : 'deno-x86_64-apple-darwin.zip'
  }
  if (platform === 'win32') return 'deno-x86_64-pc-windows-msvc.zip'
  return arch === 'arm64'
    ? 'deno-aarch64-unknown-linux-gnu.zip'
    : 'deno-x86_64-unknown-linux-gnu.zip'
}

async function fetchDeno(versions: Versions): Promise<void> {
  const dest = join(RESOURCES_DIR, `deno${EXE}`)
  const zipPath = `${dest}.zip`
  const tag = await latestTag('denoland/deno').catch(() => 'latest')
  process.stdout.write(`  deno (${tag}) ... `)
  try {
    await download(`https://github.com/denoland/deno/releases/latest/download/${denoAsset()}`, zipPath)
    // deno release zips contain a single `deno`/`deno.exe` executable.
    const entry = new AdmZip(zipPath).getEntries().find((e) => e.entryName.replace(/^.*\//, '') === `deno${EXE}`)
    if (!entry) throw new Error('deno executable not found in archive')
    await writeFile(dest, entry.getData())
    if (!IS_WIN) await chmod(dest, 0o755)
    versions['deno'] = tag
    console.log(`ok (${await sizeMB(dest)})`)
  } finally {
    await rm(zipPath, { force: true }).catch(() => {})
  }
}

// --- ffmpeg / ffprobe (copied from npm packages) ----------------------------

async function copyBinary(label: string, src: string, versions: Versions): Promise<void> {
  const dest = join(RESOURCES_DIR, `${label}${EXE}`)
  process.stdout.write(`  ${label} ... `)
  await copyFile(src, dest)
  if (!IS_WIN) await chmod(dest, 0o755)
  console.log(`ok (${await sizeMB(dest)})`)
}

async function fetchFfmpegTools(versions: Versions): Promise<void> {
  // ffmpeg-static exports the absolute path to the current-platform binary.
  const ffmpegPath = require('ffmpeg-static') as string
  // @ffprobe-installer/ffprobe exports { path, version }.
  const ffprobe = require('@ffprobe-installer/ffprobe') as { path: string; version?: string }
  await copyBinary('ffmpeg', ffmpegPath, versions)
  await copyBinary('ffprobe', ffprobe.path, versions)
  if (ffprobe.version) versions['ffprobe'] = ffprobe.version
}

// --- main -------------------------------------------------------------------

async function main(): Promise<void> {
  await mkdir(RESOURCES_DIR, { recursive: true })
  console.log(`Fetching binaries for ${process.platform}/${process.arch} -> resources/`)

  // Preserve any versions we don't refresh this run.
  const versionsFile = join(RESOURCES_DIR, 'versions.json')
  const versions: Versions = await readFile(versionsFile, 'utf8')
    .then((raw) => JSON.parse(raw) as Versions)
    .catch(() => ({}))

  const steps: Array<[string, () => Promise<void>]> = [
    ['yt-dlp', () => fetchYtDlp(versions)],
    ['deno', () => fetchDeno(versions)],
    ['ffmpeg/ffprobe', () => fetchFfmpegTools(versions)]
  ]

  for (const [name, step] of steps) {
    try {
      await step()
    } catch (err) {
      console.log(`  ${name} FAILED: ${(err as Error).message}`)
      process.exitCode = 1
    }
  }

  await writeFile(versionsFile, `${JSON.stringify(versions, null, 2)}\n`)
}

main()
