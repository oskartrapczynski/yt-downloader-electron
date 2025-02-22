import { TDownloadOption } from '@shared/types/types/download-option'
// import ytdl from '@distube/ytdl-core'

export const downloadVideo = async (
  // youtubeUrl: string,
  // fileName: string,
  videoFormat: TDownloadOption['videoFormat'],
  videoResolution: TDownloadOption['videoResolution']
) => {
  try {
    console.log(videoFormat, videoResolution)

    // const videoStream = ytdl(youtubeUrl, { filter: (f) => f.qualityLabel === videoResolution })

    // console.log(videoStream)
  } catch (err) {
    console.log(err)
  }
}
