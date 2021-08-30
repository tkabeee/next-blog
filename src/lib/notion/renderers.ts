// https://github.com/ijjk/notion-blog/blob/main/src/lib/notion/renderers.ts

import React from 'react'
import { components } from '../../components/dynamic'

const applyTags = (
  tags: string[] = [],
  children: any,
  noPTag: boolean = false,
  key: number
) => {
  let child = children

  for (const tag of tags) {
    const props: { [key: string]: any } = { key }
    let tagName: string | React.ReactNode = tag[0]
    let elemType: React.ReactNode = tagName

    if (noPTag && tagName === 'p') elemType = React.Fragment
    if (tagName === 'c') elemType = components.Code
    if (tagName === '_') {
      elemType = 'span'
      props.className = 'underline'
    }
    if (tagName === 'a') {
      elemType = components.a
      props.href = tag[1]
    }
    if (tagName === 'e') {
      elemType = components.Equation
      props.displayMode = false
      child = tag[1]
    }
    if (tagName === 'h') {
      elemType = components.h
      props.style = {
        background: tag[1],
      }
    }

    child = React.createElement(elemType as string, props, child)
  }
  return child
}

export const textBlock = (
  text: any = [],
  noPTag: boolean = false,
  mainKey: string
) => {
  const children = []
  let key = 0

  for (const textItem of text) {
    key++
    if (textItem.length === 1) {
      children.push(textItem)
      continue
    }
    children.push(applyTags(textItem[1], textItem[0], noPTag, key))
  }
  return React.createElement(
    noPTag ? React.Fragment : components.p,
    { key: mainKey },
    ...children,
    noPTag
  )
}
