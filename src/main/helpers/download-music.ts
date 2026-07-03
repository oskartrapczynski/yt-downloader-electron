import { TDownloadOption } from '@shared/types/types/download-option'
import { getDownloadFolderPath } from './get-download-folder-path'
import { getBinaryPath } from './get-binary-path'
import { audioBitrateMap } from './audio-bitrate.map'
import { getJsRuntimeArgs } from './get-js-runtime'
import { isLosslessMusicFormat } from '@shared/constants/lossless-music-format'
import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { execFile } from 'child_process'
import { app } from 'electron'
import ffmpegPath from 'ffmpeg-static'
import { dirname } from 'path'

// Formats that support an embedded thumbnail / cover art.
const THUMBNAIL_CAPABLE_FORMATS: TDownloadOption['musicFormat'][] = [
  MUSIC_FORMAT.MP3,
  MUSIC_FORMAT.FLAC
]

export const downloadMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality'],
  isPlaylist: boolean
) => {
  if (!ffmpegPath) throw new Error('ffmpegPath is not defined')

  const ffmpegLocation = dirname(ffmpegPath)
  const commandPath = getBinaryPath({ target: 'yt-dlp' })
  const downloadDir = getDownloadFolderPath()

  console.log('download Music')
  console.log({ isPackaged: app.isPackaged, dirname: __dirname, fileName, musicFormat, musicQuality })

  const outputTemplate = isPlaylist
    ? `${downloadDir}/%(playlist_index)s - %(title)s.%(ext)s`
    : `${downloadDir}/${fileName}.%(ext)s`

  const args = [
    ...getJsRuntimeArgs(),
    '--extract-audio',
    '--audio-format',
    musicFormat,
    '--ffmpeg-location',
    ffmpegLocation,
    '--embed-metadata',
    isPlaylist ? '--yes-playlist' : '--no-playlist',
    '-o',
    outputTemplate
  ]

  // Bitrate/quality only applies to lossy formats (MP3). Skip it for lossless (WAV/AIFF/FLAC).
  if (!isLosslessMusicFormat(musicFormat)) {
    const bitrate = audioBitrateMap[musicFormat]?.[musicQuality]
    if (bitrate) {
      args.push('--audio-quality', `${bitrate}K`)
    }
  }

  // Only embed a thumbnail for containers that support cover art.
  if (THUMBNAIL_CAPABLE_FORMATS.includes(musicFormat)) {
    args.push('--embed-thumbnail')
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
