import { IPost } from '@/models/post'
import { INotionPageChunk } from '@/models/notion/page-chunk'
import { REVALIDATE_SECONDS_BLOG_POST } from '@/lib/constants'
import { formatDateStr } from '@/lib/helpers/blog-helper'
import { getAllBlogSlugs } from '@/lib/notion/getAllBlogSlugs'
import { getPageData } from '@/lib/notion/getPageData'

import { Container } from '@/components/styled/layout'
import {
  Article,
  ArticleTitle,
  ArticleContent,
} from '@/components/styled/article'
import { NotionPage } from '@/components/notion-page'
import { getPost } from '@/actions/get-post'

export const revalidate = REVALIDATE_SECONDS_BLOG_POST

export async function generateStaticParams() {
  const list: string[] = await getAllBlogSlugs()

  return list.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post: IPost = await getPost(params.slug)
  return {
    title: post?.title,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post: IPost = await getPost(params.slug)
  const pageData: INotionPageChunk = await getPageData(post.id)

  return (
    <>
      <Article>
        <Container className="mt-16">
          <div className="flex justify-center w-full">
            <div className="w-full">
              {post?.title && (
                <ArticleTitle className="mt-8 text-5xl">
                  {post.title}
                </ArticleTitle>
              )}
              {post?.date && (
                <div className="mt-3">Posted: {formatDateStr(post.date)}</div>
              )}
            </div>
          </div>
        </Container>
        <Container className="mt-8">
          <ArticleContent className="notion-page-content">
            <div className="flex justify-center w-full">
              <div className="w-full">
                {pageData && <NotionPage data={pageData} />}
              </div>
            </div>
          </ArticleContent>
        </Container>
      </Article>
    </>
  )
}
