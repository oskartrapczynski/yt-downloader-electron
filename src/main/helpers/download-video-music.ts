import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath, getFfmpegLocation } from './get-binary-path'
import { audioBitrateMap } from './audio-bitrate.map'
import { getJsRuntimeArgs } from './get-js-runtime'
import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { execFile } from 'child_process'
import { app } from 'electron'

// Containers that YouTube's native codecs can be remuxed into without re-encoding.
// Everything else must be re-encoded with ffmpeg (--recode-video).
const REMUX_CONTAINERS: TDownloadOption['videoFormat'][] = [VIDEO_FORMAT.MP4]

export const downloadVideoMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicQuality: TDownloadOption['musicQuality'],
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution'],
  isPlaylist: boolean
) => {
  const ffmpegLocation = getFfmpegLocation()
  const commandPath = getBinaryPath({ target: 'yt-dlp' })
  const downloadDir = getDownloadFolderPath()

  console.log('download VideoMusic')
  console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName, videoFormat, videoResolution })

  // '1080p' -> 1080
  const height = parseInt(videoResolution, 10)

  const outputTemplate = isPlaylist
    ? `${downloadDir}/%(title)s.%(ext)s`
    : `${downloadDir}/${fileName}.%(ext)s`

  // Prefer H.264 video + AAC audio (widely compatible and reliably downloadable);
  // fall back to any stream at the requested resolution if H.264 isn't offered.
  const format =
    `bv*[height<=${height}][vcodec^=avc1]+ba[acodec^=mp4a]/` +
    `bv*[height<=${height}][vcodec^=avc1]+ba/b[height<=${height}]`

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
    // Remux into the container (no re-encode). Audio is copied, so quality can't change here.
    args.push('--merge-output-format', videoFormat)
  } else {
    // Re-encode into the chosen container with ffmpeg.
    args.push('--recode-video', videoFormat)

    // Apply the selected audio bitrate during the re-encode (uses the lossy tier scale).
    const bitrate = audioBitrateMap[MUSIC_FORMAT.MP3]?.[musicQuality]
    if (bitrate) {
      args.push('--postprocessor-args', `VideoConvertor:-b:a ${bitrate}k`)
    }
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
