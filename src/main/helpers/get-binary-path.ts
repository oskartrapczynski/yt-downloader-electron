import { app } from 'electron'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getUserYtDlpPath } from './ensure-ytdlp'

type BinaryTarget = 'yt-dlp' | 'ffmpeg' | 'ffprobe' | 'deno'

type GetBinaryPathParams = {
  target: BinaryTarget
}

/** Canonical filename for a binary on the current platform (`.exe` only on Windows). */
const binaryFilename = (target: BinaryTarget): string =>
  `${target}${process.platform === 'win32' ? '.exe' : ''}`

/**
 * Directory holding the bundled binaries. In a packaged app the `resources/`
 * folder is unpacked out of the asar archive (see `asarUnpack` in
 * electron-builder.yml) so the executables can actually be spawned.
 */
export const getResourcesDir = (): string =>
  join(
    app.isPackaged ? app.getAppPath().replace('app.asar', 'app.asar.unpacked') : app.getAppPath(),
    'resources'
  )

/**
 * Resolves the path to a bundled binary.
 *
 * `yt-dlp` prefers the auto-updated copy in userData (see ensure-ytdlp.ts) and
 * falls back to the bundled one. ffmpeg/ffprobe/deno are pinned and always
 * resolved from `resources/`.
 */
export const getBinaryPath = ({ target }: GetBinaryPathParams): string => {
  if (target === 'yt-dlp') {
    const userPath = getUserYtDlpPath()
    if (existsSync(userPath)) return userPath
  }

  return join(getResourcesDir(), binaryFilename(target))
}

/**
 * Location passed to yt-dlp's `--ffmpeg-location`. yt-dlp accepts a directory
 * and looks for both ffmpeg and ffprobe inside it — both live in `resources/`.
 */
export const getFfmpegLocation = (): string => getResourcesDir()
