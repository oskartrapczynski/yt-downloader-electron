import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { SelectMusicFormats } from './SelectMusicFormats'
import { SelectMusicQuality } from './SelectMusicQuality'
import { SelectVideoFormat } from './SelectVideoFormat'
import { SelectVideoResolution } from './SelectVideoResolution'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TDownloadOption } from '@shared/types/types/download-option'

interface SelectDetailsProps {
  formatTypeButton: TFormatTypeButtonEnum | null
  downloadOption: TDownloadOption
  setDownloadOption: (value: React.SetStateAction<TDownloadOption>) => void
}

export const SelectDetails = ({
  formatTypeButton,
  downloadOption,
  setDownloadOption
}: SelectDetailsProps) => {
  if (formatTypeButton === FORMAT_TYPE_BUTTON.MUSIC) {
    return (
      <>
        <SelectMusicFormats downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        <SelectMusicQuality downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
      </>
    )
  }
  if (formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO) {
    return (
      <>
        <SelectVideoFormat downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        <SelectVideoResolution
          downloadOption={downloadOption}
          setDownloadOption={setDownloadOption}
        />
      </>
    )
  }
  if (formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO_MUSIC) {
    return (
      <>
        <SelectVideoFormat downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        <SelectVideoResolution
          downloadOption={downloadOption}
          setDownloadOption={setDownloadOption}
        />
        <SelectMusicFormats downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        <SelectMusicQuality downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
      </>
    )
  }
  return null
}
