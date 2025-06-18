import { Select } from '@chakra-ui/react'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { OptionSelect } from './OptionSelect'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectMusicQualityProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

export const SelectMusicQuality = ({
  downloadOption,
  setDownloadOption
}: SelectMusicQualityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, musicQuality: e.target.value as TMusicQualityEnum }))
  }

  return (
    <Select
      placeholder="Music Quality"
      size="md"
      value={downloadOption.musicQuality ?? MUSIC_QUALITY.BEST}
      onChange={handleChange}
    >
      {Object.values(MUSIC_QUALITY).map((quality) => (
        <OptionSelect key={`music-quality-${quality}`} property={quality.toUpperCase()} />
      ))}
    </Select>
  )
}
