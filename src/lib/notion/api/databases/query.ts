// ref: https://developers.notion.com/reference/database

import { notion } from '../../client'
import { INotionPage } from '../../../../models/notion/page'

export interface IResponse {
  object: string
  results: INotionPage[]
  has_more: boolean
  next_cursor: string
}

export async function query(params: any): Promise<IResponse> {
  const { filter, sorts, startCursor, pageSize } = params

  return await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: filter,
    sorts: sorts,
    start_cursor: startCursor || undefined,
    page_size: pageSize || 100,
  })
}
