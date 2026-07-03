import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath, getFfmpegLocation } from './get-binary-path'
import { getJsRuntimeArgs } from './get-js-runtime'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { execFile } from 'child_process'
import { app } from 'electron'

// Containers YouTube's native codecs can be remuxed into without re-encoding.
const REMUX_CONTAINERS: TDownloadOption['videoFormat'][] = [VIDEO_FORMAT.MP4]

export const downloadVideo = async (
  youtubeUrl: string,
  fileName: string,
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution'],
  isPlaylist: boolean
) => {
  const ffmpegLocation = getFfmpegLocation()
  const commandPath = getBinaryPath({ target: 'yt-dlp' })
  const downloadDir = getDownloadFolderPath()

  console.log('download Video')
  console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName, videoFormat, videoResolution })

  // '1080p' -> 1080
  const height = parseInt(videoResolution, 10)

  const outputTemplate = isPlaylist
    ? `${downloadDir}/%(title)s.%(ext)s`
    : `${downloadDir}/${fileName}.%(ext)s`

  // Prefer H.264 (widely compatible); fall back to any stream at the requested resolution.
  const format =
    `bv*[height<=${height}][vcodec^=avc1]/bv*[height<=${height}]/b[height<=${height}]`

  const args = [
    ...getJsRuntimeArgs(),
    '-f',
    format,
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
