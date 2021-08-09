import { query } from './query'
import { filterByPublishedPage, filterBySlug } from './filters'
import { sortByLatest } from './sorts'

export const queryForPublishedPagesBySlug = async (
  slug: string,
  startCursor?: string,
  pageSize?: number
) => {
  const filter = {
    and: [filterByPublishedPage, filterBySlug(slug)],
  }
  const sorts = [sortByLatest]

  return await query({
    filter: filter,
    sorts: sorts,
    startCursor: startCursor,
    pageSize: pageSize,
  })
}
