'use client'

import { useEffect } from 'react'

import { INotionPageChunk } from '../models/notion/page-chunk'
import { textBlock } from '../lib/notion/renderers'
import { getApiAssetUrl } from '../lib/helpers/blog-helper'

import { Page } from './styled/notion'
import {
  NotionParagraph,
  NotionHeader,
  NotionSubHeader,
  NotionSubSubHeader,
  NotionBulletedList,
  NotionNumberedList,
  NotionBookmark,
  NotionImage,
  NotionVideo,
  NotionTweet,
} from './notion-blocks'

interface Props {
  data: INotionPageChunk
}

export const NotionPage = ({ data }: Props) => {
  let numberedListIds: number[] = []
  let columnMap: {
    [id: string]: {
      key: string
      parent_id: string
      nested: string[]
      children: React.ReactFragment[]
    }
  } = {}
  const hasTweet: boolean = data.blocks.some(
    (block) => block.value.type == 'tweet'
  )
  const twitterWidgetsSrc: string = 'https://platform.twitter.com/widgets.js'

  useEffect(() => {
    if (hasTweet) {
      window.twttr = ((d, id) => {
        const js: HTMLScriptElement = d.createElement('script')
        const fjs: HTMLScriptElement = d.getElementsByTagName('script')[0]
        const t: any = window.twttr || {}
        if (d.getElementById(id)) return t
        js.id = id
        js.src = twitterWidgetsSrc
        fjs.parentNode!.insertBefore(js, fjs)
        t._e = []
        t.ready = (f: any) => {
          t._e.push(f)
        }
        return t
      })(document, 'twitter-wjs')
    }
  }, [hasTweet])

  return (
    <Page>
      {(!data.blocks || data.blocks.length === 0) &&
        <>{console.log('This page has no content')}</>}
      {(data.blocks || []).map((block, blockIdx) => {
        const { role, value } = block
        const { type, properties, id, parent_id } = value
        const isEditor = role === 'editor'
        const isNumberedList = type === 'numbered_list'

        let toRender = []

        // reset list number
        if (isEditor && !isNumberedList) {
          numberedListIds = []
        }

        switch (type) {
          case 'page': {
            break
          }

          // Paragraph blocks
          case 'text': {
            const { format = {} } = value
            toRender.push(
              <NotionParagraph key={id} format={format}>
                {textBlock(properties?.title || [], true, id)}
              </NotionParagraph>
            )
            break
          }

          // Heading one blocks
          case 'header': {
            toRender.push(
              <NotionHeader key={id} id={id}>
                {textBlock(properties?.title || [], true, id)}
              </NotionHeader>
            )
            break
          }

          // Heading two blocks
          case 'sub_header': {
            toRender.push(
              <NotionSubHeader key={id} id={id}>
                {textBlock(properties?.title || [], true, id)}
              </NotionSubHeader>
            )
            break
          }

          // Heading three blocks
          case 'sub_sub_header': {
            toRender.push(
              <NotionSubSubHeader key={id} id={id}>
                {textBlock(properties?.title || [], true, id)}
              </NotionSubSubHeader>
            )
            break
          }

          // Bulleted list item blocks
          case 'bulleted_list': {
            toRender.push(
              <NotionBulletedList key={id}>
                {textBlock(properties?.title || [], true, id)}
              </NotionBulletedList>
            )
            break
          }

          // Numbered list item blocks
          case 'numbered_list': {
            numberedListIds.push(id)
            toRender.push(
              <NotionNumberedList
                key={id}
                number={numberedListIds.indexOf(id) + 1}
              >
                {textBlock(properties?.title || [], true, id)}
              </NotionNumberedList>
            )
            break
          }

          // Bookmark blocks
          case 'bookmark': {
            const { link, title, description } = properties
            const { format = {} } = value
            toRender.push(
              <NotionBookmark
                key={id}
                link={link}
                title={title}
                description={description}
                format={format}
              />
            )
            break
          }

          // Image blocks
          case 'image': {
            const { format = {} } = value
            const {
              block_width,
              block_height,
              display_source,
              block_aspect_ratio,
            } = format
            const width = block_width
            const height = block_height || block_width * block_aspect_ratio
            toRender.push(
              <NotionImage
                key={id}
                src={getApiAssetUrl(display_source, id)}
                alt={properties.caption && properties.caption[0][0]}
                width={width}
                height={height}
                wrapped={Object.keys(columnMap).indexOf(parent_id) != -1}
              />
            )
            break
          }

          // Video blocks
          case 'video': {
            const { format = {} } = value
            const { block_width, display_source } = format

            toRender.push(
              <NotionVideo
                key={id}
                id={id}
                width={block_width}
                source={display_source}
              />
            )
            break
          }

          // Tweet blocks
          case 'tweet': {
            const src = properties.source[0][0]
            const tweetId = src.split('/')[5].split('?')[0]

            toRender.push(<NotionTweet key={id} id={id} tweetId={tweetId} />)
            break
          }

          default: {
            if (process.env.NODE_ENV !== 'production') {
              console.log('unknown type', type)
            }
            break
          }
        }

        // add column
        if (columnMap[parent_id]) {
          columnMap[parent_id].nested.push(id)
          columnMap[parent_id].children.push(toRender)

          return []
        }

        return toRender
      })}
    </Page>
  )
}
