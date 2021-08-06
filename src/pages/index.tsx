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
    <div className={styles.container}>
      <Head>
        <title>Noition Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Blog</h1>

        <p className={styles.description}>description</p>

        <div className={styles.grid}>
          {posts.length > 0 && posts.map((post: IPost, pIdx: number) => {
            return (
              <Link href={post.path} as={post.path} key={pIdx}>
                <a className={styles.card}>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </a>
              </Link>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Index
