import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'

import { Container } from '../components/container'

import {
  BLOG_POSTS_PER_PAGE,
  REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
} from '../lib/constants'
import { queryForPublishedPages } from '../lib/notion/api/databases/queryForPublishedPages'
import { convertToPost } from '../lib/notion/convertToPost'
import { formatDateStr } from '../lib/helpers/blog-helper'
import { IPost } from '../models/post'

import { borderColors } from '../styles/global'
import { spacingUnit } from '../styles/notion.global'

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

const ArticleListTitle = styled.h2`
  margin-bottom: ${Math.floor(spacingUnit * 3.75)}px; ;
`

const FeedArticleLink = styled.a`
  display: flex;
  border-top: 1px solid ${borderColors.gray};
  padding: 30px 0;
`

const FeedArticleContent = styled.section`
  flex: 1;
`

const FeedArticleMeta = styled.div`
  margin-top: 10px;
`

const FeedArticleTitle = styled.h3`
  margin-bottom: 0;
`

const ButtonLoadMore = styled.button`
  margin-top: 25px;
  padding: 25px 0;
  width: 100%;
  background: #3367d6;
  border: 0;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  &:hover {
    background: #4285f4;
  }
`

const Index = ({ posts = [] }) => {
  return (
    <>
      <Head>
        <title>The Next Blog</title>
      </Head>
      <Main>
        <Container>
          <ArticleList>
            <ArticleListTitle>Recent posts</ArticleListTitle>
            <div>
              <nav>
                {posts.length > 0 &&
                  posts.map((post: IPost, pIdx: number) => {
                    return (
                      <Link href={post.path} as={post.path} key={pIdx} passHref>
                        <FeedArticleLink>
                          <FeedArticleContent>
                            <FeedArticleTitle>{post.title}</FeedArticleTitle>
                            <FeedArticleMeta>
                              <time dateTime={post.createdAt}>
                                {formatDateStr(post.createdAt)}
                              </time>
                            </FeedArticleMeta>
                          </FeedArticleContent>
                        </FeedArticleLink>
                      </Link>
                    )
                  })}
              </nav>
              <ButtonLoadMore>
                <span>Load More Posts</span>
              </ButtonLoadMore>
            </div>
          </ArticleList>
        </Container>
      </Main>
    </>
  )
}

export default Index
