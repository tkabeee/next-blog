import styled from 'styled-components'

import { INotionPageChunk } from '../models/notion/page-chunk'

const Page = styled.div`
  display: flex;
`

export const NotionPage = ({ data }: { data: INotionPageChunk }) => {
  return (
    <Page>
      page
    </Page>
  )
}
