import Head from 'next/head'
import Link from 'next/link'

import {
  BLOG_POSTS_PER_PAGE,
  REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
} from '../lib/constants'
import { queryForPublishedPages } from '../lib/notion/api/databases/queryForPublishedPages'
import { convertToPost } from '../lib/notion/convertToPost'
import { IPost } from '../models/post'

import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const response = await queryForPublishedPages(
    '',
    BLOG_POSTS_PER_PAGE,
  )

  const posts: IPost[] = await Promise.all(
    response.results.map(async (page) => {
      return await convertToPost(page)
    })
  )

  return {
    props: {
      posts,
    },
    revalidate: REVALIDATE_SECONDS_BLOG_POSTS_INDEX
  }
}

const Index = ({ posts = [] }) => {
  return (
    <>
      <Head>
        <title>Noition Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles['article-list']}>
          <h2 className={styles['article-list__title']}>Stories</h2>
          <div>
            <nav>
            {posts.length > 0 && posts.map((post: IPost, pIdx: number) => {
              return (
                <Link href={post.path} as={post.path} key={pIdx}>
                  <a className={styles['feed-article']}>
                    <section className={styles['feed-article__content']}>
                      <header className={styles['feed-article__head']}></header>
                      <h3 className={styles['feed-article__title']}>{post.title}</h3>
                    </section>
                  </a>
                </Link>
              )
            })}
            </nav>
            <button>
              <span>LOAD MORE</span>
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Index
