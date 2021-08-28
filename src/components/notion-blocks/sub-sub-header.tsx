import styled from 'styled-components'

import { Heading } from './heading'
import { fontFamily } from '../../styles/notion.global'

interface Props {
  children: any
  id: string
}

const Block = styled.div`
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1px;
`

const Wrap = styled.div`
  display: flex;
  width: 100%;
  font-family: ${fontFamily};
  font-weight: 600;
  font-size: 1.25em;
  color: inherit;
  line-height: 1.3;
  fill: inherit;
`

const Content = styled.div`
  padding: 3px 2px;
  width: 100%;
  max-width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
`

export const NotionSubSubHeader = ({ children, id: blockId }: Props) => {
  return (
    <Block>
      <Wrap>
        <Content>
          <Heading id={blockId} Type="h3">{children}</Heading>
        </Content>
      </Wrap>
    </Block>
  )
}
