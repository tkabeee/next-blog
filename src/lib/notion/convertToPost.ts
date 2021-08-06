import { INotionPage } from '../../models/notion/page'
import { IPost } from '../../models/post'
import { getPostPath, getPostUrl } from '../helpers/blog-helper'

export async function convertToPost(page: INotionPage): Promise<IPost> {
  const { id, created_time, last_edited_time, properties: props } = page

  const Page: string = props.Page.title[0].plain_text
  const Slug: string = props.Slug.select.name
  const Description: string = props.Description.rich_text[0]?.plain_text || ''
  const Category: string = props.Category.select.name
  const Tag: string[] = props.Tag.multi_select.map(
    (item: { name: string }) => item.name
  )
  const Date: number = props.Date.date.start
  const CreatedAt: string = created_time
  const UpdatedAt: string = last_edited_time
  const Published: boolean = props.Published.checkbox
  const Url: string = getPostUrl(Slug)
  const Path: string = getPostPath(Slug)

  return {
    id,
    Page,
    Slug,
    Description,
    Category,
    Tag,
    Date,
    CreatedAt,
    UpdatedAt,
    Published,
    Url,
    Path,
  }
}
