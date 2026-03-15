import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath } from './get-binary-path'
import { exec } from 'child_process'
import { app } from 'electron'
import ffmpegPath from 'ffmpeg-static'
import { dirname } from 'path'

export const downloadMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality']
  // TODO: connect musicQuality
) => {
  try {
    if (!ffmpegPath) throw new Error('ffmpegPath is not defined')

    const ffmpegLocation = dirname(ffmpegPath)

    return new Promise((resolve, reject) => {
      console.log('download Music')
      console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName })

      const commandPath = getBinaryPath({ target: 'yt-dlp' })
      const downloadDir = getDownloadFolderPath()

      const command = `"${commandPath}" --extract-audio --audio-format mp3 --ffmpeg-location "${ffmpegLocation}" -o "${downloadDir}/${fileName}.${musicFormat}" ${youtubeUrl}`

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
