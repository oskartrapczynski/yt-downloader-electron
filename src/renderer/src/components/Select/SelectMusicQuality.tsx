import { Select, Text } from '@chakra-ui/react'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { OptionSelect } from './OptionSelect'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectMusicQualityProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

const DISABLED_QUALITIES: TMusicQualityEnum[] = [
  MUSIC_QUALITY.LOW,
  MUSIC_QUALITY.MEDIUM,
  MUSIC_QUALITY.HIGH
]

export const SelectMusicQuality = ({
  downloadOption,
  setDownloadOption
}: SelectMusicQualityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, musicQuality: e.target.value as TMusicQualityEnum }))
  }

  return (
    <>
      <Text>Music Quality:</Text>
      <Select
        size="md"
        value={downloadOption.musicQuality ?? MUSIC_QUALITY.BEST}
        onChange={handleChange}
      >
        {Object.values(MUSIC_QUALITY).map((quality) => (
          <OptionSelect
            key={`music-quality-${quality}`}
            property={quality.toUpperCase()}
            disabled={DISABLED_QUALITIES.includes(quality)}
          />
        ))}
      </Select>
    </>
  )
}
