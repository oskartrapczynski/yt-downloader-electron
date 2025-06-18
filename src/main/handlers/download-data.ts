import { downloadMusic } from '@main/helpers/download-music'
import { downloadVideo } from '@main/helpers/download-video'
import { downloadVideoMusic } from '@main/helpers/download-video-music'
import { FORMAT_TYPE_BUTTON } from '@shared/constants/format-type-button'
import { TFormatTypeButtonEnum } from '@shared/types/enums/format-type-button'
import { TDownloadOption } from '@shared/types/types/download-option'

export const downloadData = async (
  _: Electron.IpcMainInvokeEvent,
  youtubeUrl: string,
  fileName: string,
  downloadOption: TDownloadOption,
  formatTypeButton: TFormatTypeButtonEnum
): Promise<unknown> => {
  try {
    switch (formatTypeButton) {
      case FORMAT_TYPE_BUTTON.MUSIC: {
        const { musicFormat, musicQuality } = downloadOption
        await downloadMusic(youtubeUrl, fileName, musicFormat, musicQuality)
        // TODO: poprawic przekazywane settingsy do pobrania
        break
      }
      case FORMAT_TYPE_BUTTON.VIDEO: {
        const { videoFormat, videoResolution } = downloadOption
        await downloadVideo(youtubeUrl, fileName, videoFormat, videoResolution)
        break
      }
      case FORMAT_TYPE_BUTTON.VIDEO_MUSIC: {
        const { musicFormat, musicQuality, videoFormat, videoResolution } = downloadOption
        await downloadVideoMusic(
          youtubeUrl,
          fileName,
          musicFormat,
          musicQuality,
          videoFormat,
          videoResolution
        )
        break
      }
      default:
        throw new Error('Invalid format type button')
    }
  } catch (err) {
    return {
      isError: true,
      message: (err as Error).message,
      thumbnailUrl: null,
      author: null,
      title: null,
      viewCount: null,
      videoResolution: null
    }
  }
}
