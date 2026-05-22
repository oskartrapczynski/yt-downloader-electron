import { app } from 'electron'
import { createWriteStream } from 'node:fs'
import { chmod, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'
import { pipeline } from 'node:stream/promises'

const RELEASE_API = 'https://api.github.com/repos/yt-dlp/yt-dlp/releases/latest'
const RELEASE_BASE = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download'

const getPlatformAsset = (): { asset: string; filename: string; executable: boolean } => {
  if (process.platform === 'darwin') {
    return { asset: 'yt-dlp_macos', filename: 'yt-dlp_macos', executable: true }
  }
  if (process.platform === 'win32') {
    return { asset: 'yt-dlp.exe', filename: 'yt-dlp.exe', executable: false }
  }
  return { asset: 'yt-dlp_linux', filename: 'yt-dlp', executable: true }
}

export const getUserBinDir = (): string => join(app.getPath('userData'), 'bin')

export const getUserYtDlpPath = (): string => join(getUserBinDir(), getPlatformAsset().filename)

const readInstalledVersion = async (versionFile: string): Promise<string | null> => {
  try {
    const raw = await readFile(versionFile, 'utf8')
    return (JSON.parse(raw) as { version: string }).version ?? null
  } catch {
    return null
  }
}

export const ensureYtDlpUpToDate = async (): Promise<void> => {
  const binDir = getUserBinDir()
  const versionFile = join(binDir, 'version.json')
  const { asset, filename, executable } = getPlatformAsset()
  const destPath = join(binDir, filename)
  const tmpPath = `${destPath}.download`

  try {
    const res = await fetch(RELEASE_API, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`release API HTTP ${res.status}`)
    const { tag_name: latest } = (await res.json()) as { tag_name: string }

    const installed = await readInstalledVersion(versionFile)
    if (installed === latest) return

    console.log(`[yt-dlp] updating ${installed ?? 'bundled'} -> ${latest}`)
    await mkdir(binDir, { recursive: true })

    const dl = await fetch(`${RELEASE_BASE}/${asset}`, { redirect: 'follow' })
    if (!dl.ok || !dl.body) throw new Error(`download HTTP ${dl.status}`)
    await pipeline(
      Readable.fromWeb(dl.body as NodeReadableStream<Uint8Array>),
      createWriteStream(tmpPath)
    )
    await rename(tmpPath, destPath)
    if (executable) await chmod(destPath, 0o755)
    await writeFile(versionFile, JSON.stringify({ version: latest }))
    console.log(`[yt-dlp] updated to ${latest}`)
  } catch (err) {
    await rm(tmpPath, { force: true }).catch(() => {})
    console.warn(`[yt-dlp] update skipped: ${(err as Error).message}`)
  }
}
