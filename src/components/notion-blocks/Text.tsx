import styled from 'styled-components'
import { fontColors, backgroundColors } from '../../styles/notion.global'

interface Props {
  children: any
  format: any
}

const Block = styled.div`
  width: 100%;
  margin-top: 1px;
  margin-bottom: 1px;
`

const Wrap2 = styled.div`
  color: inherit;
  fill: inherit;
`

const Wrap = styled.div`
  display: flex;
`

const Text = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
`

const Blank = styled.div`
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  padding: 3px 2px;
  min-height: 1em;
  &:before {
    display: block;
    content: '';
  }
`

export const NotionText = ({ children: component, format }: Props) => {
  const blockColor = {
    color: fontColors[format?.block_color],
    fill: fontColors[format?.block_color],
    background: backgroundColors[format?.block_color],
  }
  return (
    <Block>
      <Wrap2 style={blockColor}>
        <Wrap>
          {Array.isArray(component.props.children) ? <Text>{component}</Text> : <Blank />}
        </Wrap>
      </Wrap2>
    </Block>
  )
}
