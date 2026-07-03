import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'

// Bitrate (kbps) per quality tier. Only lossy formats appear here — lossless
// formats (WAV/AIFF/FLAC) ignore quality entirely.
export const audioBitrateMap: Partial<
  Record<TMusicFormatEnum, Partial<Record<TMusicQualityEnum, number>>>
> = {
  [MUSIC_FORMAT.MP3]: {
    [MUSIC_QUALITY.LOW]: 128,
    [MUSIC_QUALITY.MEDIUM]: 192,
    [MUSIC_QUALITY.HIGH]: 256,
    [MUSIC_QUALITY.BEST]: 320
  }
}
