import { GetStaticPaths, GetStaticProps } from 'next'

import { Header } from '../../components/header'
import { NotionPage } from '../../components/notion-page'

import { IPost } from '../../models/post'
import { INotionPage } from "../../models/notion/page"
import { INotionPageChunk } from '../../models/notion/page-chunk'
import { REVALIDATE_SECONDS_BLOG_POST } from '../../lib/constants'
import { getAllBlogSlugs } from "../../lib/notion/getAllBlogSlugs"
import { getPageBySlug } from "../../lib/notion/getPage"
import { convertToPost } from '../../lib/notion/convertToPost'

import { formatDateStr } from '../../lib/helpers/blog-helper'
import { getPageData } from '../../lib/notion/getPageData'

type Params = {
  slug: string
}

type Props = {
  post: IPost
}

export const getStaticPaths: GetStaticPaths<Params> = async() => {
  const list: string[] = await getAllBlogSlugs()
  const paths = list.map((slug) => {
    return { params: { slug: slug } }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async({ params }) => {
  const page: INotionPage = await getPageBySlug(params!.slug)

  const post: IPost = await convertToPost(page)
  const pageData: INotionPageChunk = await getPageData(post.id)

  return {
    props: {
      post,
      pageData,
    },
    revalidate: REVALIDATE_SECONDS_BLOG_POST,
  }
}

const RenderPost = ({ post, pageData }: { post: IPost, pageData: INotionPageChunk}) => {
  return (
    <>
      <Header />
      <article>
        <section className='break-words'>
          <div className='flex justify-center'>
            <div className='w-full max-w-2xl'>
              <h1 className='mt-8 text-5xl'>{post?.title}</h1>
              {post?.date && (
                <div className="posted">Posted: {formatDateStr(post.date)}</div>
              )}
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='w-full max-w-2xl'>
              {pageData && <NotionPage data={pageData} />}
            </div>
          </div>
        </section>
      </article>
    </>
  )
}

export default RenderPost
