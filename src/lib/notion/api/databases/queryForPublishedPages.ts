import { query } from './query'
import { filterByNotEmptySlug, filterByPublishedPage } from './filters'
import { sortByLatest } from './sorts'

export const queryForPublishedPages = async (
  startCursor?: string,
  pageSize?: number
) => {
  const filter = {
    and: [filterByNotEmptySlug, filterByPublishedPage],
  }
  const sorts = [sortByLatest]

  return await query({
    filter: filter,
    sorts: sorts,
    startCursor: startCursor,
    pageSize: pageSize,
  })
}
