import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { SelectMusicFormats } from './SelectMusicFormats'
import { SelectMusicQuality } from './SelectMusicQuality'
import { SelectVideoFormat } from './SelectVideoFormat'
import { SelectVideoResolution } from './SelectVideoResolution'
import { MUSIC_FORMAT } from '../../../../shared/constants/music-format'
import { TMusicFormatEnum } from '../../../../shared/types/enums/music-format'
import { TMusicQualityEnum } from '../../../../shared/types/enums/music-quality'
import { VIDEO_FORMAT } from '../../../../shared/constants/video-format'
import { VIDEO_RESOLUTION } from '../../../../shared/constants/video-resolution'
import { TVideoFormatEnum } from '../../../../shared/types/enums/video-format'
import { TVideoResolutionEnum } from '../../../../shared/types/enums/video-resolution'
import { TFormatTypeButtonEnum } from '../../../../shared/types/enums/format-type-button'

interface SelectDetailsProps {
  formatTypeButton: TFormatTypeButtonEnum | null
  musicFormat: ValueOf<typeof MUSIC_FORMAT> | null
  setMusicFormat: React.Dispatch<React.SetStateAction<TMusicFormatEnum | null>>
  musicQuality: TMusicQualityEnum | null
  setMusicQuality: React.Dispatch<React.SetStateAction<TMusicQualityEnum | null>>
  videoFormat: ValueOf<typeof VIDEO_FORMAT> | null
  setVideoFormat: React.Dispatch<React.SetStateAction<TVideoFormatEnum | null>>
  videoResolution: ValueOf<typeof VIDEO_RESOLUTION> | null
  setVideoResolution: React.Dispatch<React.SetStateAction<TVideoResolutionEnum | null>>
}

export const SelectDetails = ({
  formatTypeButton,
  musicFormat,
  setMusicFormat,
  musicQuality,
  setMusicQuality,
  videoFormat,
  setVideoFormat,
  videoResolution,
  setVideoResolution
}: SelectDetailsProps) => {
  if (formatTypeButton === FORMAT_TYPE_BUTTON.MUSIC) {
    return (
      <>
        <SelectMusicFormats musicFormat={musicFormat} setMusicFormat={setMusicFormat} />
        <SelectMusicQuality musicQuality={musicQuality} setMusicQuality={setMusicQuality} />
      </>
    )
  }
  if (formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO) {
    return (
      <>
        <SelectVideoFormat videoFormat={videoFormat} setVideoFormat={setVideoFormat} />
        <SelectVideoResolution
          videoResolution={videoResolution}
          setVideoResolution={setVideoResolution}
        />
      </>
    )
  }
  if (formatTypeButton === FORMAT_TYPE_BUTTON.VIDEO_MUSIC) {
    return (
      <>
        <SelectVideoFormat videoFormat={videoFormat} setVideoFormat={setVideoFormat} />
        <SelectVideoResolution
          videoResolution={videoResolution}
          setVideoResolution={setVideoResolution}
        />
        <SelectMusicFormats musicFormat={musicFormat} setMusicFormat={setMusicFormat} />
        <SelectMusicQuality musicQuality={musicQuality} setMusicQuality={setMusicQuality} />
      </>
    )
  }
  return null
}
