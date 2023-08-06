// https://github.com/ijjk/notion-blog/blob/main/src/components/dynamic.tsx

import dynamic from 'next/dynamic'
import { ExtLink } from './ext-link'
import { Highlighter } from './highlighter'

export interface Props {
  ol: string
  ul: string
  li: string
  p: string
  blockquote: string
  a: (props: any) => JSX.Element
  h: (props: any) => JSX.Element
  Code: React.ComponentType<any>
  Counter: React.ComponentType<any>
  Equation: React.ComponentType<any>
}

export const components: Props = {
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
