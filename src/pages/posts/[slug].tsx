import { GetStaticPaths, GetStaticProps } from 'next'
import styled from 'styled-components'

import { Header } from '../../components/header'
import { Container } from '../../components/container'
import { NotionPage } from '../../components/notion-page'

import { IPost } from '../../models/post'
import { INotionPage } from '../../models/notion/page'
import { INotionPageChunk } from '../../models/notion/page-chunk'
import { REVALIDATE_SECONDS_BLOG_POST } from '../../lib/constants'
import { getAllBlogSlugs } from '../../lib/notion/getAllBlogSlugs'
import { getPageBySlug } from '../../lib/notion/getPage'
import { convertToPost } from '../../lib/notion/convertToPost'

import { formatDateStr } from '../../lib/helpers/blog-helper'
import { getPageData } from '../../lib/notion/getPageData'

type Params = {
  slug: string
}

type Props = {
  post: IPost
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const list: string[] = await getAllBlogSlugs()
  const paths = list.map((slug) => {
    return { params: { slug: slug } }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
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

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  overflow: auto;
  margin-right: 0px;
  margin-bottom: 0px;
  width: 100%;
`

const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  cursor: text;
`

const PageContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
  padding-bottom: 15vh;
`

const RenderPost = ({
  post,
  pageData,
}: {
  post: IPost
  pageData: INotionPageChunk
}) => {
  return (
    <>
      <Header />
      <Article>
        <Container className="mt-20">
          <div className="flex justify-center">
            <div className="w-full">
              <PageTitle className="mt-8 text-5xl">{post?.title}</PageTitle>
              {post?.date && (
                <div className="mt-3">Posted: {formatDateStr(post.date)}</div>
              )}
            </div>
          </div>
        </Container>
        <Container className="mt-8">
          <PageContent>
            <div className="flex justify-center">
              <div className="w-full">
                {pageData && <NotionPage data={pageData} />}
              </div>
            </div>
          </PageContent>
        </Container>
      </Article>
    </>
  )
}

export default RenderPost
