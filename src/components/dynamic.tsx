// https://github.com/ijjk/notion-blog/blob/main/src/components/dynamic.tsx

import dynamic from 'next/dynamic'
import { ExtLink } from './ext-link'
import { Highlighter } from './highlighter'

interface Props {
    ol: string
    ul: string
    li: string
    p: string
    blockquote: string
    a: (props: any) => JSX.Element
    h: any
}

export const components = {
  // default tags
  ol: 'ol',
  ul: 'ul',
  li: 'li',
  p: 'p',
  blockquote: 'blockquote',
  a: ExtLink,
  h: Highlighter,

  Code: dynamic(() => import('./code')),
  Counter: dynamic(() => import('./counter')),
  Equation: dynamic(() => import('./equation')),
}
