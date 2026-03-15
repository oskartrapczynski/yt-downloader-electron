import { Alert, Select, Text, AlertIcon } from '@chakra-ui/react'
import { OptionSelect } from './OptionSelect'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { TVideoFormatEnum } from '@shared/types/enums/video-format'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectVideoFormatProps {
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

const DISABLED_FORMATS: TVideoFormatEnum[] = [VIDEO_FORMAT.MP4, VIDEO_FORMAT.AVI, VIDEO_FORMAT.MOV]

export const SelectVideoFormat = ({
  downloadOption,
  setDownloadOption
}: SelectVideoFormatProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadOption((prev) => ({ ...prev, videoFormat: e.target.value as TVideoFormatEnum }))
  }

  return (
    <>
      <Alert status="warning" borderRadius={5}>
        <AlertIcon />
        This section is temporary disabled
      </Alert>
      <Text>Video Format:</Text>
      <Select
        size="md"
        value={downloadOption.videoFormat ?? VIDEO_FORMAT.MP4}
        onChange={handleChange}
      >
        {Object.values(VIDEO_FORMAT).map((format) => (
          <OptionSelect
            key={`video-format-${format}`}
            property={format.toUpperCase()}
            disabled={DISABLED_FORMATS.includes(format)}
          />
        ))}
      </Select>
    </>
  )
}
