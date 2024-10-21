import { TMetaData } from '@shared/types/types/metadata'
import { DownloaderError } from './DownloaderError'
import { DownloaderCard } from './DownloaderCard'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'

interface Props {
  downloaderState: TDownloaderStateEnum
  metadata: TMetaData | null
  url: string
}

export const DownloaderContent = ({ downloaderState, metadata, url }: Props) => {
  return (
    <>
      <DownloaderError downloaderState={downloaderState} metadata={metadata} />
      {<DownloaderCard downloaderState={downloaderState} metadata={metadata} url={url} />}
    </>
  )
}
