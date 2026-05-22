#!/usr/bin/env tsx
import { createWriteStream } from 'node:fs'
import { chmod, mkdir, rename, rm, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'

type Target = {
  asset: string
  filename: string
  executable: boolean
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const RESOURCES_DIR = join(__dirname, '..', 'resources')
const BASE_URL = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download'

const TARGETS: Target[] = [
  { asset: 'yt-dlp_macos', filename: 'yt-dlp_macos', executable: true },
  { asset: 'yt-dlp.exe', filename: 'yt-dlp.exe', executable: false },
  { asset: 'yt-dlp_linux', filename: 'yt-dlp', executable: true }
]

async function download(url: string, destPath: string): Promise<void> {
  const tmpPath = `${destPath}.download`
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok || !res.body) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  await pipeline(
    Readable.fromWeb(res.body as NodeReadableStream<Uint8Array>),
    createWriteStream(tmpPath)
  )
  await rename(tmpPath, destPath)
}

async function main(): Promise<void> {
  await mkdir(RESOURCES_DIR, { recursive: true })
  const tag = await fetch('https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest')
    .then((r) => r.json() as Promise<{ tag_name: string }>)
    .then((j) => j.tag_name)
    .catch(() => 'unknown')
  console.log(`Updating yt-dlp binaries to ${tag}`)

  for (const { asset, filename, executable } of TARGETS) {
    const dest = join(RESOURCES_DIR, filename)
    const url = `${BASE_URL}/${asset}`
    process.stdout.write(`  ${filename} ... `)
    try {
      await download(url, dest)
      if (executable) await chmod(dest, 0o755)
      const { size } = await stat(dest)
      console.log(`ok (${(size / 1024 / 1024).toFixed(1)} MB)`)
    } catch (err) {
      await rm(`${dest}.download`, { force: true })
      console.log(`FAILED: ${(err as Error).message}`)
      process.exitCode = 1
    }
  }
}

main()
