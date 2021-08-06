import Head from 'next/head'
import Image from 'next/image'

import {
  BLOG_POSTS_PER_PAGE,
  REVALIDATE_SECONDS_BLOG_POSTS_INDEX,
} from '../lib/constants'
import { queryForPublishedPages } from '../lib/notion/api/databases/queryForPublishedPages'

import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const response = await queryForPublishedPages(
    '',
    BLOG_POSTS_PER_PAGE,
  )

  return {
    props: {
    },
    revalidate: REVALIDATE_SECONDS_BLOG_POSTS_INDEX
  }
}

const Index = () => {
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
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Index
