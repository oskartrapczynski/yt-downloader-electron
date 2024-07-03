import { DOWNLOAD_OPTION } from './download-option'

export const INIT_DOWNLOAD_OPTION = Object.assign(
  {},
  ...Object.values(DOWNLOAD_OPTION).map((value) => ({ [value]: undefined }))
)
