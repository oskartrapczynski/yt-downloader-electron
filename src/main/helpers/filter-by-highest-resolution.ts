import { VIDEO_RESOLUTION } from '@shared/constants/video-resolution'
import { TVideoResolutions } from '@shared/types/types/video-resolution'
import ytdl from 'ytdl-core'

export const filterByHighestResolution = (formats: ytdl.videoFormat[]): TVideoResolutions => {
  const highestResolution = Object.values(VIDEO_RESOLUTION).findIndex((resolution) =>
    formats.filter((format) => format.qualityLabel === resolution)
  )
  return Object.values(VIDEO_RESOLUTION).slice(highestResolution) as TVideoResolutions
}
