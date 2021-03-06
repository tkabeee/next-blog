import type { AppProps } from 'next/app'
import styled from 'styled-components'

import { Header } from '../components/header'
import { Footer } from '../components/footer'

import '../styles/tailwind.css'
import '../styles/root.css'
import '../styles/global.css'
import '../styles/notion.scss'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Wrapper>
  )
}
export default MyApp
