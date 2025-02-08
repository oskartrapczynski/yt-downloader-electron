import { Select } from '@chakra-ui/react'
import { OptionSelect } from './OptionSelect'
import { VIDEO_RESOLUTION } from '@shared/constants/video-resolution'
import { TVideoResolutionEnum } from '@shared/types/enums/video-resolution'

interface SelectVideoResolutionProps {
  videoResolution: ValueOf<typeof VIDEO_RESOLUTION> | null
  setVideoResolution: React.Dispatch<React.SetStateAction<TVideoResolutionEnum | null>>
}

export const SelectVideoResolution = ({
  videoResolution,
  setVideoResolution
}: SelectVideoResolutionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue: typeof videoResolution =
      e.target.value === '' ? null : (e.target.value as TVideoResolutionEnum)
    setVideoResolution(newValue)
  }

  return (
    <Select
      placeholder="Video Resolution"
      size="md"
      value={videoResolution ?? undefined}
      onChange={handleChange}
    >
      {Object.values(VIDEO_RESOLUTION).map((format) => (
        <OptionSelect key={`music-format-${format}`} property={format.toUpperCase()} />
      ))}
    </Select>
  )
}
