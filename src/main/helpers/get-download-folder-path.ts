import { app } from 'electron'

export const getDownloadFolderPath = () => `${app.getPath('downloads')}`
