import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IPC_HANDLER } from '@shared/constants/ipc-handler'

const { FETCH_SONG_INFO } = IPC_HANDLER

// Custom APIs for renderer
const api = {
  [FETCH_SONG_INFO]: (url: string) => ipcRenderer.invoke(FETCH_SONG_INFO, url)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
