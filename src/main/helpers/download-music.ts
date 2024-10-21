import { TDownloadOption } from '@shared/types/types/download-option'
import ytdl from '@distube/ytdl-core'
import { createWriteStream } from 'fs'
import { getDownloadFolderPath } from './get-download-folder-path'
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import { isAccessToPath } from './is-access-to-path'
import { audioBitrateMap } from './audio-bitrate.map'

export const downloadMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality']
) => {
  try {
    if (!isAccessToPath(`${getDownloadFolderPath()}/${fileName}.${musicFormat}`)) {
      throw new Error('No access for this path')
    }
    ffmpeg.setFfmpegPath(ffmpegPath)
    const videoWithBestAudioStream = ytdl(youtubeUrl, { quality: 'highestaudio' })
    const audioBitrate = audioBitrateMap[musicFormat!][musicQuality]

    const audioStream = ffmpeg()
      .addInput(videoWithBestAudioStream)
      .audioBitrate(`${audioBitrate}`)
      .toFormat(musicFormat!)

    let totalTime = Infinity
    audioStream
      .on('codecData', (data) => {
        // @ts-ignore: duration exists
        totalTime = parseInt(data.duration.replace(/:/g, ''))
      })
      .on('progress', (progress) => {
        const time = parseInt(progress.timemark.replace(/:/g, ''))
        const percent = (time / totalTime) * 100
        console.log(`${percent.toFixed()}%`)
      })
      .on('error', (err) => {
        throw err
      })
      .on('end', () => {
        console.log('Finished')
      })
      .pipe(createWriteStream(`${getDownloadFolderPath()}/${fileName}.${musicFormat}`))
  } catch (err) {
    console.log(err)
  }
}
