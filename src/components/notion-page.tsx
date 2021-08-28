import styled from 'styled-components'

import { INotionPageChunk } from '../models/notion/page-chunk'
import { textBlock } from '../lib/notion/renderers'

import {
  NotionParagraph,
  NotionHeader,
  NotionSubHeader,
  NotionSubSubHeader,
 } from './notion-blocks'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
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

          // Heading two blocks
          case 'sub_header': {
            toRender.push(
              <NotionSubHeader key={id} id={id}>
                {textBlock(properties ? properties.title : [], true, id)}
              </NotionSubHeader>
            )
            break
          }

          // Heading three blocks
          case 'sub_sub_header': {
            toRender.push(
              <NotionSubSubHeader key={id} id={id}>
                {textBlock(properties ? properties.title : [], true, id)}
              </NotionSubSubHeader>
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
