import { URL } from 'node:url'

const cleanUrl = (originalUrl) => {
  const url = new URL(originalUrl)
  url.searchParams.delete('page')
  url.searchParams.delete('size')
  return url.toString()
}

export { cleanUrl }
