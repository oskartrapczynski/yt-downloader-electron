import { filterByHighestResolution } from '@main/helpers/filter-by-highest-resolution'
import { TMetaData } from '@shared/types/types/metadata'
import ytdl from '@distube/ytdl-core'

export const getMetaDataFromURL = async (
  _: Electron.IpcMainInvokeEvent,
  youtubeUrl: string
): Promise<TMetaData> => {
  try {
    const metaData = await ytdl.getInfo(youtubeUrl)

    const thumbnailUrl = metaData.videoDetails.thumbnails.at(-1)?.url

    const author = metaData.videoDetails.author.name
    const title = metaData.videoDetails.title
    const viewCount = metaData.videoDetails.viewCount
    const formats = metaData.formats

    if (!formats.length) throw new Error('Error while downloading metadatas!')

    const filteredByHighestResolution = filterByHighestResolution(formats)

    return {
      isError: false,
      message: 'Metadata downloaded successfully',
      thumbnailUrl: thumbnailUrl ? thumbnailUrl : null,
      author,
      title,
      viewCount,
      videoResolution: filteredByHighestResolution
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
