'use client'

import styled from 'styled-components'

import { spacingUnit } from '@/styles/notion.global'

export const ArticleList = styled.section``

export const ArticleListTitle = styled.h2`
  margin-bottom: ${Math.floor(spacingUnit * 3.75)}px; ;
`

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  overflow: auto;
  margin-right: 0px;
  margin-bottom: 0px;
  width: 100%;
`

export const ArticleTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  cursor: text;
`

export const ArticleContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  flex-grow: 1;
  padding-bottom: 15vh;
`
