import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import {
  BLOG_POSTS_PER_PAGE,
  REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
} from '../lib/constants'
import { queryForPublishedPages } from '../lib/notion/api/databases/queryForPublishedPages'
import { convertToPost } from '../lib/notion/convertToPost'
import { formatDateStr } from '../lib/helpers/blog-helper'
import { IPost } from '../models/post'

export async function getStaticProps() {
  const response = await queryForPublishedPages('', BLOG_POSTS_PER_PAGE)

  const posts: IPost[] = await Promise.all(
    response.results.map(async (page) => {
      return await convertToPost(page)
    })
  )

  return {
    props: {
      posts,
    },
    revalidate: REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
  }
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 5rem 0;
`

const ArticleList = styled.section``

const ArticleListTitle = styled.h2``

const FeedArticleLink = styled.a`
  display: flex;
  border-top: 1px solid #d7d7d7;
  padding: 30px 0;
`

const FeedArticleContent = styled.section`
  flex: 1;
`

const FeedArticleHead = styled.header`
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1.5;
`

const FeedArticleTitle = styled.h3`
  margin-bottom: 0;
`

const Index = ({ posts = [] }) => {
  return (
    <>
      <Head>
        <title>Noition Blog</title>
      </Head>
      <Main>
        <ArticleList>
          <ArticleListTitle>Stories</ArticleListTitle>
          <div>
            <nav>
              {posts.length > 0 &&
                posts.map((post: IPost, pIdx: number) => {
                  return (
                    <Link href={post.path} as={post.path} key={pIdx} passHref>
                      <FeedArticleLink>
                        <FeedArticleContent>
                          <FeedArticleHead>
                            {formatDateStr(post.createdAt)}
                          </FeedArticleHead>
                          <FeedArticleTitle>{post.title}</FeedArticleTitle>
                        </FeedArticleContent>
                      </FeedArticleLink>
                    </Link>
                  )
                })}
            </nav>
            <button>
              <span>LOAD MORE</span>
            </button>
          </div>
        </ArticleList>
      </Main>
    </>
  )
}

export default Index
