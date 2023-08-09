'use server'

import {
  BLOG_POSTS_PER_PAGE,
} from '../lib/constants'
import { convertToPost } from '../lib/notion/convertToPost'
import { queryForPublishedPages } from '../lib/notion/api/databases/queryForPublishedPages'
import { IPost } from '../models/post'

export async function findPosts() {
  const response = await queryForPublishedPages('', BLOG_POSTS_PER_PAGE)

  const posts: IPost[] = await Promise.all(
    response.results.map(async (page) => {
      return await convertToPost(page)
    })
  )

  return posts
}
