'use client'

import styled from 'styled-components'

import { borderColors } from '@/styles/global'

export const FeedArticleLink = styled.a`
  display: flex;
  border-top: 1px solid ${borderColors.gray};
  padding: 30px 0;
`

export const FeedArticleContent = styled.section`
  flex: 1;
`

export const FeedArticleMeta = styled.div`
  margin-top: 10px;
`

export const FeedArticleTitle = styled.h3`
  margin-bottom: 0;
`
