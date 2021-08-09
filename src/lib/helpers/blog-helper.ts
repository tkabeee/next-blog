const url = require('url')

export const getIndexPath = (): string => {
  return url.resolve('', '/posts')
}

export const getIndexUrl = (): string => {
  return url.resolve(process.env.BASE_URL, getIndexPath())
}

export const getPostPath = (slug: string): string => {
  return url.resolve('', `${getIndexPath()}/${slug}`)
}

export const getPostUrl = (slug: string): string => {
  return url.resolve(process.env.BASE_URL, getPostPath(slug))
}

export const formatDateStr = (date: string | number): string => {
  return new Date(date).toLocaleString('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
}
