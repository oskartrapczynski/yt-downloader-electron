import { downloadData } from '@main/handlers/download-data'
import { fetchSongInfo } from '@main/handlers/fetch-song-info'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'

const { FETCH_SONG_INFO, DOWNLOAD_DATA } = IPC_HANDLER

export default interface ICustomAPI {
  //invokes
  [FETCH_SONG_INFO]: typeof fetchSongInfo
  [DOWNLOAD_DATA]: typeof downloadData
  // -----------
  //api
}
