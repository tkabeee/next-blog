export interface INotionPage {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  parent: {
    type: string
    database_id: string
  }
  archived?: boolean
  properties: {
    Page: any
    Slug: any
    Published: any
    Date: any
    Authors: any
    Description: any
    Category: any
    Tag: any
    Editor: any
  }
}
