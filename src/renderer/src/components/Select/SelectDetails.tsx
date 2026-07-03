import { Checkbox } from '@chakra-ui/react'
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
  const playlistCheckbox = (
    <Checkbox
      isChecked={downloadOption.isPlaylist}
      onChange={(e) =>
        setDownloadOption((prev) => ({ ...prev, isPlaylist: e.target.checked }))
      }
    >
      Download entire playlist
    </Checkbox>
  )

  if (formatTypeButton === FORMAT_TYPE_BUTTON.MUSIC) {
    return (
      <>
        <SelectMusicFormats downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        <SelectMusicQuality downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        {playlistCheckbox}
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
        {playlistCheckbox}
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
        <SelectMusicQuality downloadOption={downloadOption} setDownloadOption={setDownloadOption} />
        {playlistCheckbox}
      </>
    )
  }
  return null
}
