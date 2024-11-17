import { Select } from '@chakra-ui/react'
import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { OptionSelect } from '../OptionSelect'

interface SelectMusicFormatsProps {
  musicFormat: ValueOf<typeof MUSIC_FORMAT> | null
  setMusicFormat: React.Dispatch<React.SetStateAction<TMusicFormatEnum | null>>
}

export const SelectMusicFormats = ({ musicFormat, setMusicFormat }: SelectMusicFormatsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: typeof musicFormat =
      e.target.value === '' ? null : (e.target.value as TMusicFormatEnum)
    setMusicFormat(newValue)
  }

  return (
    <Select
      placeholder="Music Format"
      size="md"
      value={musicFormat ?? undefined}
      onChange={handleChange}
    >
      {Object.values(MUSIC_FORMAT).map((format) => (
        <OptionSelect key={`music-format-${format}`} property={format.toUpperCase()} />
      ))}
    </Select>
  )
}
