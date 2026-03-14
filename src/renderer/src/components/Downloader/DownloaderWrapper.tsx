import { DownloaderHeader } from './DownloaderHeader'
import { DownloaderContent } from './DownloaderContent'

import { TMetaData } from '@shared/types/types/metadata'
import { useState } from 'react'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'
import { DOWNLOADER_STATE } from '@shared/constants/downloader-state'

const { FETCH_SONG_INFO } = IPC_HANDLER

export const DownloaderWrapper = () => {
  const [url, setUrl] = useState('')
  const [downloaderState, setDownloaderState] = useState<TDownloaderStateEnum>(
    DOWNLOADER_STATE.NULL
  )
  const [metadata, setMetadata] = useState<TMetaData | null>(null)

  const handleChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }
  const handleClick = async () => {
    setDownloaderState(DOWNLOADER_STATE.LOADING)
    const resMetadata = await window.electron.ipcRenderer.invoke(FETCH_SONG_INFO, url)
    setDownloaderState(DOWNLOADER_STATE.DONE)
    setMetadata(resMetadata)
  }

  console.log('downloaderState', downloaderState)
  return (
    <>
      <DownloaderHeader url={url} onChange={handleChangeUrlInput} onClick={handleClick} />
      <DownloaderContent downloaderState={downloaderState} metadata={metadata} url={url} />
    </>
  )
}
