import { Select } from '@chakra-ui/react'
import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { OptionSelect } from './OptionSelect'
import { TDownloadOption } from '../../../../shared/types/types/download-option'

interface SelectMusicFormatsProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

export const SelectMusicFormats = ({
  downloadOption,
  setDownloadOption
}: SelectMusicFormatsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, musicFormat: e.target.value as TMusicFormatEnum }))
  }

  return (
    <Select
      placeholder="Music Format"
      size="md"
      value={downloadOption.musicFormat ?? MUSIC_FORMAT.MP3}
      onChange={handleChange}
    >
      {Object.values(MUSIC_FORMAT).map((format) => (
        <OptionSelect key={`music-format-${format}`} property={format.toUpperCase()} />
      ))}
    </Select>
  )
}
