'use server'

import { IPost } from '@/models/post'
import { INotionPage } from '@/models/notion/page'
import { convertToPost } from '@/lib/notion/convertToPost'
import { getPageBySlug } from '@/lib/notion/getPage'

export async function getPost(slug: string) {
  const page: INotionPage = await getPageBySlug(slug)
  const post: IPost = await convertToPost(page)

  return post
}
