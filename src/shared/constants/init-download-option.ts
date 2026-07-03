import { TDownloadOption } from '../types/types/download-option'
import { MUSIC_FORMAT } from './music-format'
import { MUSIC_QUALITY } from './music-quality'
import { VIDEO_FORMAT } from './video-format'
import { VIDEO_RESOLUTION } from './video-resolution'

export const INIT_DOWNLOAD_OPTION: TDownloadOption = {
  musicFormat: MUSIC_FORMAT.MP3,
  musicQuality: MUSIC_QUALITY.BEST,
  videoFormat: VIDEO_FORMAT.MP4,
  videoResolution: VIDEO_RESOLUTION['1080p'],
  isPlaylist: false
}
