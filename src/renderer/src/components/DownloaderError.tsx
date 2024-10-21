import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { DOWNLOADER_STATE } from '@shared/constants/downloader-state'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'
import { TMetaData } from '@shared/types/types/metadata'

interface Props {
  downloaderState: TDownloaderStateEnum
  metadata: TMetaData | null
}

export const DownloaderError = ({ downloaderState, metadata }: Props) => {
  if (!metadata || downloaderState !== DOWNLOADER_STATE.DONE || metadata?.isError === false)
    return null

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{metadata.message ? metadata.message : 'No Error Message'}</AlertTitle>
    </Alert>
  )
}
