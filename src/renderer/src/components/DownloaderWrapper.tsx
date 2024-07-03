import { DownloaderHeader } from './DownloaderHeader'
import { DownloaderContent } from './DownloaderContent'

import { TMetaData } from '@shared/types/types/metadata'
import { useState } from 'react'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'
import { TDownloaderStateEnum } from '@shared/types/enums/downloader-state'
import { DOWNLOADER_STATE } from '@shared/constants/downloader-state'

export const DownloaderWrapper = () => {
  const { GET_METADATA_FROM_URL } = IPC_HANDLER

  // const [url, setUrl] = useState('')
  const [url, setUrl] = useState(
    'https://www.youtube.com/watch?v=ixkoVwKQaJg&ab_channel=DJSnakeVEVO'
  )
  const [state, setState] = useState<TDownloaderStateEnum>(DOWNLOADER_STATE.NULL)
  const [metadata, setMetadata] = useState<TMetaData | null>(null)

  const handleChangeUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }
  const handleClick = async () => {
    setState(DOWNLOADER_STATE.LOADING)
    const resMetadata = await window.electron.ipcRenderer.invoke(GET_METADATA_FROM_URL, url)
    setState(DOWNLOADER_STATE.DONE)
    setMetadata(resMetadata)
  }

  console.log('state', state)
  return (
    <>
      <DownloaderHeader url={url} onChange={handleChangeUrlInput} onClick={handleClick} />
      <DownloaderContent state={state} metadata={metadata} />
    </>
  )
}
