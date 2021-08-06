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
    Description: any
    Tags: any
    Category: any
    Date: any
    Published: any
  }
}
