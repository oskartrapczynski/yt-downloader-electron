import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'

export const audioBitrateMap = {
  [MUSIC_FORMAT.MP3]: {
    [MUSIC_QUALITY.LOW]: 128,
    [MUSIC_QUALITY.MEDIUM]: 192,
    [MUSIC_QUALITY.HIGH]: 256,
    [MUSIC_QUALITY.BEST]: 320
  }
  // [MUSIC_FORMAT.FLAC]: {
  //   [MUSIC_QUALITY.LOW]: 128,
  //   [MUSIC_QUALITY.MEDIUM]: 256,
  //   [MUSIC_QUALITY.HIGH]: 512,
  //   [MUSIC_QUALITY.BEST]: 1024
  // }
}
