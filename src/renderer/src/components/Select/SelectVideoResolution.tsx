import { Select, Text } from '@chakra-ui/react'
import { OptionSelect } from './OptionSelect'
import { VIDEO_RESOLUTION } from '@shared/constants/video-resolution'
import { TVideoResolutionEnum } from '@shared/types/enums/video-resolution'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectVideoResolutionProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

const DISABLED_RESOLUTIONS: TVideoResolutionEnum[] = Object.values(VIDEO_RESOLUTION)

export const SelectVideoResolution = ({
  downloadOption,
  setDownloadOption
}: SelectVideoResolutionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({
      ...prev,
      videoResolution: e.target.value as TVideoResolutionEnum
    }))
  }

  return (
    <>
      <Text>Video Resolution:</Text>
      <Select
        size="md"
        value={downloadOption.videoResolution ?? VIDEO_RESOLUTION['1080p']}
        onChange={handleChange}
      >
        {Object.values(VIDEO_RESOLUTION).map((format) => (
          <OptionSelect
            key={`music-format-${format}`}
            property={format.toUpperCase()}
            disabled={DISABLED_RESOLUTIONS.includes(format)}
          />
        ))}
      </Select>
    </>
  )
}
