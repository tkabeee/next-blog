import styled from 'styled-components'

import { INotionPageChunk } from '../models/notion/page-chunk'
import { textBlock } from '../lib/notion/renderers'

import {
  NotionParagraph,
  NotionHeader,
 } from './notion-blocks'

const Page = styled.div`
  display: flex;
`

interface Props {
  data: INotionPageChunk
}

export const NotionPage = ({ data }: Props) => {
  return (
    <Page>
      {(!data.blocks || data.blocks.length === 0) && console.log('This page has no content')}
      {(data.blocks || []).map((block, blockIdx) => {
        const { role, value } = block
        const { type, properties, id, parent_id } = value
        let toRender = []

        switch (type) {
          case 'page':
            break

          // Paragraph blocks
          case 'text': {
            const { format = {} } = value
            toRender.push(
              <NotionParagraph key={id} format={format}>
                {textBlock(properties ? properties.title : [], true, id)}
              </NotionParagraph>
            )
            break
          }

          // Heading one blocks
          case 'header': {
            toRender.push(
              <NotionHeader key={id} id={id}>
                {textBlock(properties ? properties.title : [], true, id)}
              </NotionHeader>
            )
            break
          }
          default:
            if (process.env.NODE_ENV !== 'production') {
              console.log('unknown type', type)
            }
            break
        }
        return toRender
      })}
    </Page>
  )
}
