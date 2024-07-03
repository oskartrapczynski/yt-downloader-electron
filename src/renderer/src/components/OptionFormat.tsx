import { TVideoProperty } from '@shared/types/types/video-property'
import { TFormatTypeButtons } from '@shared/types/format-type-buttons'

interface Props {
  formatTypeButton: TFormatTypeButtons
  videoProperty: TVideoProperty
}

export const OptionFormat = ({ formatTypeButton, videoProperty }: Props) => {
  return (
    <option key={`${formatTypeButton}-${videoProperty.mimeType}-${videoProperty.container}`}>
      {videoProperty.container}
    </option>
  )
}
