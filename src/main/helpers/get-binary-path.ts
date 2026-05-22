import { app } from 'electron'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getUserYtDlpPath } from './ensure-ytdlp'

type GetBinaryPathParams = {
  target: 'yt-dlp'
}

export const getBinaryPath = ({ target }: GetBinaryPathParams): string => {
  const platform = process.platform
  const suffix = platform === 'win32' ? '.exe' : platform === 'darwin' ? '_macos' : ''
  const filename = `${target}${suffix}`

  if (target === 'yt-dlp') {
    const userPath = getUserYtDlpPath()
    if (existsSync(userPath)) return userPath
  }

  return join(
    app.isPackaged
      ? join(app.getAppPath()).replace('app.asar', 'app.asar.unpacked')
      : join(app.getAppPath()),
    'resources',
    filename
  )
}
