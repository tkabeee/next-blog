import styled from 'styled-components'

import { spacingUnit, pageMaxWidth } from '../styles/notion.global'

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
