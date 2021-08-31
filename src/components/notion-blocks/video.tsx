import styled from 'styled-components'

import { getApiAssetPath } from '../../lib/helpers/blog-helper'

interface Props {
  id: string
  width: number
  source: string
}

const videoBgColor = 'rgb(242, 241, 238)'

const Block = styled.div`
  align-self: center;
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 100%;
`

const Video = styled.video`
  display: block;
  width: 100%;
  background-color: ${videoBgColor};
`

export const NotionVideo = ({ id, width, source }: Props) => {
  return (
    <Block style={{ width: width }}>
      <div style={{ display: 'flex' }}>
        <div
          className="notion-cursor-default"
          style={{ position: 'relative', overflow: 'hidden', flexGrow: 1 }}
        >
          <Video
            src={`${getApiAssetPath(source, id)}#t=0.001`}
            playsInline
            controls
            preload="metadata"
          />
        </div>
      </div>
    </Block>
  )
}

NotionVideo.defaultProps = {}
