import { app } from 'electron'
import { join } from 'path'

type GetBinaryPathParams = {
  target: 'yt-dlp'
}

export const getBinaryPath = ({ target }: GetBinaryPathParams): string => {
  const platform = process.platform
  const suffix = platform === 'win32' ? '.exe' : platform === 'darwin' ? '_macos' : ''
  const filename = `${target}${suffix}`

  return join(
    app.isPackaged
      ? join(app.getAppPath()).replace('app.asar', 'app.asar.unpacked')
      : join(app.getAppPath()),
    'resources',
    filename
  )
}
