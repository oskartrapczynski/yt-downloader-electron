import { Select } from '@chakra-ui/react'
import { OptionSelect } from './OptionSelect'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { TVideoFormatEnum } from '@shared/types/enums/video-format'

interface SelectVideoFormatProps {
  videoFormat: ValueOf<typeof VIDEO_FORMAT> | null
  setVideoFormat: React.Dispatch<React.SetStateAction<TVideoFormatEnum | null>>
}

export const SelectVideoFormat = ({ videoFormat, setVideoFormat }: SelectVideoFormatProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: typeof videoFormat =
      e.target.value === '' ? null : (e.target.value as TVideoFormatEnum)
    setVideoFormat(newValue)
  }

  return (
    <Select
      placeholder="Video Format"
      size="md"
      value={videoFormat ?? undefined}
      onChange={handleChange}
    >
      {Object.values(VIDEO_FORMAT).map((format) => (
        <OptionSelect key={`video-format-${format}`} property={format.toUpperCase()} />
      ))}
    </Select>
  )
}
