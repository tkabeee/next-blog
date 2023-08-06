import { INotionPage } from '../../models/notion/page'
import { IPost } from '../../models/post'
import { getPostPath, getPostUrl } from '../helpers/blog-helper'

export async function convertToPost(page: INotionPage): Promise<IPost> {
  const { id, created_time, last_edited_time, properties: props } = page

  const title: string = props.Page.title[0].plain_text
  const slug: string = props.Slug.select.name
  const description: string = props.Description.rich_text[0]?.plain_text || null
  const category: string = props.Category?.select?.name || null
  const tags: string[] =
    props.Tags?.multi_select.map((item: { name: string }) => item.name) || []
  const date: number = props.Date.date.start
  const createdAt: string = created_time.substr(0, 10)
  const updatedAt: string = last_edited_time.substr(0, 10)
  const published: boolean = props.Published.checkbox
  const url: string = getPostUrl(slug)
  const path: string = getPostPath(slug)

  return {
    id,
    title,
    slug,
    description,
    category,
    tags,
    date,
    createdAt,
    updatedAt,
    published,
    url,
    path,
  }
}
