import { MUSIC_FORMAT } from './music-format'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'

// Formats where bitrate/quality selection does not apply (uncompressed PCM or lossless).
export const LOSSLESS_MUSIC_FORMATS: TMusicFormatEnum[] = [
  MUSIC_FORMAT.WAV,
  MUSIC_FORMAT.AIFF,
  MUSIC_FORMAT.FLAC
]

export const isLosslessMusicFormat = (format: TMusicFormatEnum): boolean =>
  LOSSLESS_MUSIC_FORMATS.includes(format)
