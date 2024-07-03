import { TMetaData } from '@shared/types/types/metadata'
import { DownloaderError } from './DownloaderError'
import { DownloaderCard } from './DownloaderCard'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'
import { DOWNLOADER_STATE } from '@shared/constants/downloader-state'

interface Props {
  state: TDownloaderStateEnum
  metadata: TMetaData | null
}

export const DownloaderContent = ({ state, metadata }: Props) => {
  return (
    <>
      {state === DOWNLOADER_STATE.DONE && (
        <DownloaderError isError={metadata!.isError} errorMessage={metadata!.message} />
      )}
      {state !== null && metadata?.isError === false && (
        <DownloaderCard metadata={metadata} loading={state === DOWNLOADER_STATE.LOADING} />
      )}
    </>
  )
}
