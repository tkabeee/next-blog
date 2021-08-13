import { backgroundColors } from '../styles/notion.global'

export const Highlighter = (props: any) => (
  <span
    {...props}
    style={
      props.style?.background && {
        backgroundColor: backgroundColors[props.style.background],
      }
    }
  />
)
