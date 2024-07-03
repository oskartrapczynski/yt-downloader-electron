import { TVideoResolutions } from './video-resolution'

export type TMetaData = {
  thumbnailUrl: string | null
  author: string | null
  title: string | null
  viewCount: string | null
  isError: boolean | null
  message: string | null
  videoResolution: TVideoResolutions | null
}
