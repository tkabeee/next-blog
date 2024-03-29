// ref: https://github.com/ijjk/notion-blog/blob/main/src/components/equation.tsx

import katex from 'katex'

const render = (expression: string, displayMode: boolean): string => {
  let result!: string
  try {
    result = katex.renderToString(expression, { displayMode: displayMode })
  } catch (e) {
    if (e instanceof katex.ParseError) {
      result = e.message
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }
  }
  return result
}

interface Props {
  children: any
  displayMode: boolean
}

const Equation = ({ children, displayMode = true }: Props) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: render(children, displayMode),
      }}
    />
  )
}

export default Equation
