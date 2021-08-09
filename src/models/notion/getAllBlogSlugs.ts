import { INotionPage } from './page'
import { IResponse } from '../../lib/notion/api/databases/query'
import { queryForPublishedPages } from '../../lib/notion/api/databases/queryForPublishedPages'

export async function getAllBlogSlugs() {
  let slugs: string[] = []
  let response: IResponse
  let startCursor: string = ''

  do {
    response = await queryForPublishedPages(startCursor)
    startCursor = response.next_cursor
    slugs = slugs.concat(
      response.results.map(
        (page: INotionPage) => page.properties.Slug.select.name
      )
    )
  } while (response.has_more)

  return slugs
}

export async function getCachedAllBlogSlugs() {
  throw new Error('needs implementation')
}
