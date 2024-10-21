import fs from 'fs/promises'
import { constants } from 'fs'

export const isAccessToPath = async (path: string) => {
  try {
    await fs.access(path, constants.R_OK | constants.W_OK)
    return true
  } catch {
    return false
  }
}
