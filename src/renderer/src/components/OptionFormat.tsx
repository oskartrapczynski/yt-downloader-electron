import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TVideoProperty } from '@shared/types/types/video-property'

interface Props {
  formatTypeButton: TFormatTypeButtonEnum
  videoProperty: TVideoProperty
}

export const OptionFormat = ({ formatTypeButton, videoProperty }: Props) => {
  return (
    <option key={`${formatTypeButton}-${videoProperty.mimeType}-${videoProperty.container}`}>
      {videoProperty.container}
    </option>
  )
}
