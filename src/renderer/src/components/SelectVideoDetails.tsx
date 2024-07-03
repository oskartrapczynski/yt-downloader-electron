import { DOWNLOAD_OPTION } from '@shared/constants/download-option'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { VIDEO_FORMAT } from '@shared/constants/video-format'
import { TDownloadOptionEnum } from '@shared/types/enums/download-option'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TDownloadOption } from '@shared/types/types/download-option'
import { TVideoResolutions } from '@shared/types/types/video-resolution'
import { SelectDetails } from './SelectDetails'

interface Props {
  formatTypeButton: TFormatTypeButtonEnum | null
  videoResolutions: TVideoResolutions | null
  value: TDownloadOption | null
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, field: TDownloadOptionEnum) => void
}

export const SelectVideoDetails = ({
  formatTypeButton,
  videoResolutions,
  value,
  onChange
}: Props) => {
  const target = FORMAT_TYPE_BUTTON.VIDEO
  return (
    <>
      <SelectDetails
        formatTypeButton={formatTypeButton}
        formatyTypeButtonTarget={target}
        placeholder="Video Format"
        options={VIDEO_FORMAT}
        show="keys"
        value={value?.videoFormat}
        onChange={onChange}
        field={DOWNLOAD_OPTION.VIDEO_FORMAT}
      />

      <SelectDetails
        formatTypeButton={formatTypeButton}
        formatyTypeButtonTarget={target}
        placeholder="Video Resolution"
        options={videoResolutions}
        show="values"
        value={value?.videoResolution}
        onChange={onChange}
        field={DOWNLOAD_OPTION.VIDEO_RESOLUTION}
        conditionForRender={Boolean(value?.videoFormat)}
      />
    </>
  )
}
