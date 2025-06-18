import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { exec } from 'child_process'
import { join } from 'path'
import { app } from 'electron'

export const downloadMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality']
  // TODO: connect musicQuality
) => {
  try {
    return new Promise((resolve, reject) => {
      console.log('download Music')
      const ytdlpFile =
        process.platform === 'darwin'
          ? 'yt-dlp_macos'
          : process.platform === 'win32'
            ? 'yt-dlp.exe'
            : 'yt-dlp'

      console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName })

      const commandPath = join(
        app.isPackaged
          ? join(app.getAppPath()).replace('app.asar', 'app.asar.unpacked')
          : join(app.getAppPath()),
        'resources',
        ytdlpFile
      )

      const downloadDir = getDownloadFolderPath()

      const command = `"${commandPath}" --extract-audio --audio-format mp3 -o "${downloadDir}/${fileName}.${musicFormat}" ${youtubeUrl}`

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing yt-dlp: ${error.message}`)
          reject(error)
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          reject(stderr)
        }
        console.log(`stdout: ${stdout}`)
        resolve('Downloaded complete')
      })
    })
  } catch (err) {
    console.log(err)
  }
}
