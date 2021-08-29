import Image from 'next/image'
import styled from 'styled-components'

import { pageMaxWidth } from '../../styles/notion.global'

interface Props {
  src: string
  alt?: string
  width: number
  height: number
  wrapped?: boolean
}

const Block = styled.div`
  align-self: center;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  width: 100%;
  max-width: 100%;
`

const Div3 = styled.div`
  display: flex;
  cursor: default;
`

const Div2 = styled.div`
  position: relative;
  overflow: hidden;
  flex-grow: 1;
`

const Div1 = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

export const NotionImage = ({ src, alt, width, height, wrapped }: Props) => {
  return (
    <Block
      style={{
        marginTop: wrapped ? '2px' : '0.5em',
        width: width < pageMaxWidth ? width : '100%',
        alignSelf: wrapped ? 'flex-start' : 'center',
      }}
    >
      <Div3>
        <Div2>
          <Div1>
            <Image src={src} alt={alt} width={width} height={height} />
          </Div1>
        </Div2>
      </Div3>
    </Block>
  )
}

NotionImage.defaultProps = {
  alt: 'An image from Notion',
  wrapped: false,
}
