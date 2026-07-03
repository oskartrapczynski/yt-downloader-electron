import { Select, Text } from '@chakra-ui/react'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { OptionSelect } from './OptionSelect'
import { TDownloadOption } from '@shared/types/types/download-option'
import { isLosslessMusicFormat } from '@shared/constants/lossless-music-format'

interface SelectMusicQualityProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

export const SelectMusicQuality = ({
  downloadOption,
  setDownloadOption
}: SelectMusicQualityProps) => {
  // Bitrate/quality only applies to lossy formats (MP3). Lossless formats ignore it.
  const isLossless = isLosslessMusicFormat(downloadOption.musicFormat)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, musicQuality: e.target.value as TMusicQualityEnum }))
  }

  return (
    <>
      <Text>Music Quality{isLossless ? ' (N/A for lossless)' : ''}:</Text>
      <Select
        size="md"
        isDisabled={isLossless}
        value={downloadOption.musicQuality ?? MUSIC_QUALITY.BEST}
        onChange={handleChange}
      >
        {Object.values(MUSIC_QUALITY).map((quality) => (
          <OptionSelect key={`music-quality-${quality}`} property={quality.toUpperCase()} />
        ))}
      </Select>
    </>
  )
}
