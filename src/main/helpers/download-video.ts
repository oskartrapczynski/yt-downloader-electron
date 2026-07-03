import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath } from './get-binary-path'
import { getJsRuntimeArgs } from './get-js-runtime'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { execFile } from 'child_process'
import { app } from 'electron'
import ffmpegPath from 'ffmpeg-static'
import { dirname } from 'path'

// Containers YouTube's native codecs can be remuxed into without re-encoding.
const REMUX_CONTAINERS: TDownloadOption['videoFormat'][] = [VIDEO_FORMAT.MP4]

export const downloadVideo = async (
  youtubeUrl: string,
  fileName: string,
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution'],
  isPlaylist: boolean
) => {
  if (!ffmpegPath) throw new Error('ffmpegPath is not defined')

  const ffmpegLocation = dirname(ffmpegPath)
  const commandPath = getBinaryPath({ target: 'yt-dlp' })
  const downloadDir = getDownloadFolderPath()

  console.log('download Video')
  console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName, videoFormat, videoResolution })

  // '1080p' -> 1080
  const height = parseInt(videoResolution, 10)

  const outputTemplate = isPlaylist
    ? `${downloadDir}/%(playlist_index)s - %(title)s.%(ext)s`
    : `${downloadDir}/${fileName}.%(ext)s`

  const args = [
    ...getJsRuntimeArgs(),
    '-f',
    `bv*[height<=${height}]/b[height<=${height}]`,
    '--ffmpeg-location',
    ffmpegLocation,
    '--embed-metadata',
    isPlaylist ? '--yes-playlist' : '--no-playlist',
    '-o',
    outputTemplate
  ]

  if (REMUX_CONTAINERS.includes(videoFormat)) {
    args.push('--merge-output-format', videoFormat)
  } else {
    args.push('--recode-video', videoFormat)
  }

  args.push(youtubeUrl)

  return new Promise((resolve, reject) => {
    execFile(commandPath, args, (error, stdout, stderr) => {
      if (stderr) console.error(`stderr: ${stderr}`)
      if (error) {
        console.error(`Error executing yt-dlp: ${error.message}`)
        reject(error)
        return
      }
      console.log(`stdout: ${stdout}`)
      resolve('Downloaded complete')
    })
  })
}
