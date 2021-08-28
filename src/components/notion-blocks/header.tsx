import styled from "styled-components"

import { Heading } from "./heading"
import { fontFamily } from '../../styles/notion.global'

interface Props {
  children: any
  id: string
}

const Block = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 4px;
`

const Wrap = styled.div`
  display: flex;
  width: 100%;
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: 1.875em;
  color: inherit;
  line-height: 1.3;
  fill: inherit;
`

const Content = styled.div`
  padding: 3px 2px;
  max-width: 100%;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
`

export const NotionHeader = ({ children, id: blockId}: Props) => {
  return (
    <Block>
      <Wrap>
        <Content>
          <Heading id={blockId} Type='h1'>{children}</Heading>
        </Content>
      </Wrap>
    </Block>
  )
}
