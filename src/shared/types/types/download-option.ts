import { DOWNLOAD_OPTION } from '@shared/constants/download-option'
import { TMusicFormatEnum } from '../enums/music-format'
import { TMusicQualityEnum } from '../enums/music-quality'
import { TVideoFormatEnum } from '../enums/video-format'
import { TVideoResolutionEnum } from '../enums/video-resolution'

export type TDownloadOption = {
  [DOWNLOAD_OPTION.VIDEO_FORMAT]?: TVideoFormatEnum
  [DOWNLOAD_OPTION.MUSIC_FORMAT]?: TMusicFormatEnum
  [DOWNLOAD_OPTION.MUSIC_QUALITY]?: TMusicQualityEnum
  [DOWNLOAD_OPTION.VIDEO_RESOLUTION]?: TVideoResolutionEnum
}
