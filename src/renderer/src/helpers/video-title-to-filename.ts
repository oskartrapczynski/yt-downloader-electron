export const videoTitleToFilename = (videoTitle?: string | null) => {
  if (!videoTitle) return `author - title (${Date.now()})`
  return videoTitle
}
