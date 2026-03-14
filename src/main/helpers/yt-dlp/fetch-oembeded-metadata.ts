import { TMetaData } from '@shared/types/types/metadata'
import { net } from 'electron'

const errorData = {
  title: null,
  authorName: null,
  thumbnailUrl: null,
  isError: true
}

export const fetchOEmbed = (url: string): Promise<TMetaData> => {
  return new Promise((resolve, reject) => {
    const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    const req = net.request(endpoint)
    let body = ''

    req.on('response', (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString()
      })
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`oEmbed returned ${res.statusCode}`))
          return
        }
        try {
          const response = JSON.parse(body)

          resolve({
            title: response.title ?? 'No title',
            authorName: response.author_name ?? 'No author',
            thumbnailUrl: response.thumbnail_url ?? 'No thumbnail url',
            isError: false,
            message: 'Metadata downloaded successfully'
          })
        } catch (err) {
          reject({
            ...errorData,
            message: (err as Error).message ?? 'Unknown error'
          })
        }
      })
    })

    req.on('error', () =>
      reject({
        ...errorData,
        message: 'Unknown error'
      })
    )
    req.end()
  })
}
