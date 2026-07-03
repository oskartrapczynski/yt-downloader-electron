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
        const { musicFormat, musicQuality, isPlaylist } = downloadOption
        await downloadMusic(youtubeUrl, fileName, musicFormat, musicQuality, isPlaylist)
        break
      }
      case FORMAT_TYPE_BUTTON.VIDEO: {
        const { videoFormat, videoResolution, isPlaylist } = downloadOption
        await downloadVideo(youtubeUrl, fileName, videoFormat, videoResolution, isPlaylist)
        break
      }
      case FORMAT_TYPE_BUTTON.VIDEO_MUSIC: {
        const { musicQuality, videoFormat, videoResolution, isPlaylist } = downloadOption
        await downloadVideoMusic(
          youtubeUrl,
          fileName,
          musicQuality,
          videoFormat,
          videoResolution,
          isPlaylist
        )
        break
      }
      default:
        throw new Error('Invalid format type button')
    }
    return { isError: false, message: 'Download complete' }
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
