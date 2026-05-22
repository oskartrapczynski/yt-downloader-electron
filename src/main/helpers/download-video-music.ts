import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath } from './get-binary-path'
import { exec } from 'child_process'
import { app } from 'electron'

export const downloadVideoMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality'],
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution']
  // TODO:
  // 1. musicQuality
  // 2. videoResolution
) => {
  try {
    return new Promise((resolve, reject) => {
      console.log('download VideoMusic')
      console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName })

      const commandPath = getBinaryPath({ target: 'yt-dlp' })

      const downloadDir = getDownloadFolderPath()

      const command = `"${commandPath}" -f "bv[height<=1080][vcodec^=avc1]+ba[acodec^=mp4a]" --merge-output-format ${videoFormat} --audio-format ${musicFormat} --output "${downloadDir}/${fileName}" ${youtubeUrl}`
      // zmienic wszystkie resolutions (np 1080p na 1080)

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
