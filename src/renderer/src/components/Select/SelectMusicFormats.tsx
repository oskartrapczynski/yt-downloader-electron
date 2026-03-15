import { Select, Text } from '@chakra-ui/react'
import { MUSIC_FORMAT } from '@shared/constants/music-format'
import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { OptionSelect } from './OptionSelect'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectMusicFormatsProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

const DISABLED_FORMATS: TMusicFormatEnum[] = [
  MUSIC_FORMAT.WAV,
  MUSIC_FORMAT.AIFF,
  MUSIC_FORMAT.FLAC
]

export const SelectMusicFormats = ({
  downloadOption,
  setDownloadOption
}: SelectMusicFormatsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, musicFormat: e.target.value as TMusicFormatEnum }))
  }

  return (
    <>
      <Text>Music Format:</Text>
      <Select
        size="md"
        value={downloadOption.musicFormat ?? MUSIC_FORMAT.MP3}
        onChange={handleChange}
      >
        {Object.values(MUSIC_FORMAT).map((format) => (
          <OptionSelect
            key={`music-format-${format}`}
            property={format.toUpperCase()}
            disabled={DISABLED_FORMATS.includes(format)}
          />
        ))}
      </Select>
    </>
  )
}
