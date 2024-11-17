import { TMusicFormatEnum } from '@shared/types/enums/music-format'
import { SelectMusicFormats } from './Select/SelectMusicFormats'
import { TMusicQualityEnum } from '@shared/types/enums/music-quality'
import { SelectMusicQuality } from './Select/SelectMusicQuality'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'

interface SelectMusicDetailsProps {
  formatTypeButton: TFormatTypeButtonEnum | null
  musicFormat: TMusicFormatEnum | null
  setMusicFormat: React.Dispatch<React.SetStateAction<TMusicFormatEnum | null>>
  musicQuality: TMusicQualityEnum | null
  setMusicQuality: React.Dispatch<React.SetStateAction<TMusicQualityEnum | null>>
}

export const SelectMusicDetails = ({
  formatTypeButton,
  musicFormat,
  setMusicFormat,
  musicQuality,
  setMusicQuality
}: SelectMusicDetailsProps) => {
  console.log({ formatTypeButton })
  if (formatTypeButton !== FORMAT_TYPE_BUTTON.MUSIC) {
    return null
  }

  return (
    <>
      <SelectMusicFormats musicFormat={musicFormat} setMusicFormat={setMusicFormat} />
      <SelectMusicQuality musicQuality={musicQuality} setMusicQuality={setMusicQuality} />
    </>
  )
}
