import { queryForPublishedPagesBySlug } from './api/databases/queryForPublishedPageBySlug'

export async function getPageBySlug(slug: string) {
  const response = await queryForPublishedPagesBySlug(slug, '', 1)
  return response.results[0]
}
