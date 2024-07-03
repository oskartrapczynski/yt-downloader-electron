import { DOWNLOAD_OPTION } from './download-option'

export const INIT_DOWNLOAD_OPTION = Object.assign(
  {},
  ...Object.keys(DOWNLOAD_OPTION).map((key) => ({ [key]: undefined }))
)
