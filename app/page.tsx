import { Metadata } from 'next'
import Link from 'next/link'

import {
  REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
} from '@/lib/constants'
import { formatDateStr } from '@/lib/helpers/blog-helper'
import { findPosts } from '@/actions/find-posts'
import { IPost } from '@/models/post'

import { Main, Container } from '@/components/styled/layout'
import { ArticleList, ArticleListTitle } from '@/components/styled/article'
import { FeedArticleLink, FeedArticleContent, FeedArticleMeta, FeedArticleTitle } from '@/components/styled/feed'

export const revalidate = REVALIDATE_SECONDS_BLOG_POSTS_INDEX

export const metadata: Metadata = {
  title: 'The Next Blog',
}

export default async function HomePage() {
  const posts = await findPosts()

  return (
    <>
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
              {/*
              <ButtonLoadMore>
                <span>Load More Posts</span>
              </ButtonLoadMore>
              */}
            </div>
          </ArticleList>
        </Container>
      </Main>
    </>
  )
}
