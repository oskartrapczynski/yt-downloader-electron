import { TDownloadOption } from '@shared/types/types/download-option'
import ytdl from '@distube/ytdl-core'

export const downloadVideoMusic = async (
  youtubeUrl: string,
  fileName: string,
  musicFormat: TDownloadOption['musicFormat'],
  musicQuality: TDownloadOption['musicQuality'],
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution']
) => {
  try {
    console.log(musicFormat, musicQuality, videoFormat, videoResolution)

    const videoStream = ytdl(youtubeUrl, { filter: (f) => f.qualityLabel === videoResolution })

    // console.log(videoStream)
  } catch (err) {
    console.log(err)
  }
}
