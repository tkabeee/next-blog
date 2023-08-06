// https://developers.notion.com/reference/page

import { INotionFile } from './file'

export interface INotionPage {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  },
  last_edited_by: {
    object: string
    id: string
  },
  cover: INotionFile
  icon: INotionFile
  parent: {
    type: string
    database_id: string
  }
  archived: boolean
  properties: {
    Page: any
    Slug: any
    Description: any
    Tags: any
    Category: any
    Date: any
    Published: any
  },
  url: string
  public_url: string
}
