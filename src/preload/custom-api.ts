import { downloadData } from '@main/handlers/download-data'
import { getMetaDataFromURL } from '@main/handlers/get-metadata-from-url'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'

const { GET_METADATA_FROM_URL, DOWNLOAD_DATA } = IPC_HANDLER

export default interface ICustomAPI {
  //invokes
  [GET_METADATA_FROM_URL]: typeof getMetaDataFromURL
  [DOWNLOAD_DATA]: typeof downloadData
  // -----------
  //api
}
