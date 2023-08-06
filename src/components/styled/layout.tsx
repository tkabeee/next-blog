'use client'

import styled from 'styled-components'

import { spacingUnit, pageMaxWidth } from '@/styles/notion.global'

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 5rem 0;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export const Container = styled.section`
  padding-left: ${Math.floor(spacingUnit * 6)}px;
  padding-right: ${Math.floor(spacingUnit * 6)}px;
  width: 100%;
  max-width: ${pageMaxWidth}px;

  @media (max-width: 640px) {
    padding-left: ${Math.floor(spacingUnit * 1.5)}px;
    padding-right: ${Math.floor(spacingUnit * 1.5)}px;
  }
`
