import { Select } from '@chakra-ui/react'
import { MUSIC_QUALITY } from '@shared/constants/music-quality'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { OptionSelect } from './OptionSelect'

interface SelectMusicQualityProps {
  musicQuality: TMusicQualityEnum | null
  setMusicQuality: React.Dispatch<React.SetStateAction<TMusicQualityEnum | null>>
}

export const SelectMusicQuality = ({ musicQuality, setMusicQuality }: SelectMusicQualityProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: typeof musicQuality =
      e.target.value === '' ? null : (e.target.value as TMusicQualityEnum)
    setMusicQuality(newValue)
  }

  return (
    <Select
      placeholder="Music Quality"
      size="md"
      value={musicQuality ?? undefined}
      onChange={handleChange}
    >
      {Object.values(MUSIC_QUALITY).map((quality) => (
        <OptionSelect key={`music-quality-${quality}`} property={quality.toUpperCase()} />
      ))}
    </Select>
  )
}
