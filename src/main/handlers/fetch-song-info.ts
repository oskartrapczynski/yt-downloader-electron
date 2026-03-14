import { fetchOEmbed } from '@main/helpers/yt-dlp/fetch-oembeded-metadata'
import { TMetaData } from '@shared/types/types/metadata'

export async function fetchSongInfo(
  _: Electron.IpcMainInvokeEvent,
  url: string
): Promise<TMetaData> {
  try {
    return await fetchOEmbed(url)
  } catch (err) {
    return {
      title: null,
      authorName: null,
      thumbnailUrl: null,
      isError: true,
      message: (err as Error).message ?? 'Unknown error'
    }
  }
}
