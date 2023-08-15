import styled from 'styled-components'

import { getApiAssetPath } from '../../lib/helpers/blog-helper'

interface Props {
  id: string
  width: number
  source: string
}

const Block = styled.div`
  align-self: center;
  margin-top: 4px;
  margin-bottom: 4px;
  max-width: 100%;
`

const FrameHeightAdjust = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  height: 0px;
  padding-bottom: 56.2061%;
`

const FramePosition = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 1px;
`

const Frame = styled.iframe`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 1px;
  pointer-events: auto;
  background-color: rgb(247, 246, 245);
`

const contentStyle = {
  display: 'block',
  width: '100%',
  PointerEvents: 'none',
  backgroundColor: 'rgb(242, 241, 238)',
}

export const NotionVideo = ({ id, width, source }: Props) => {
  return (
    <Block style={{ width: width }}>
      <div style={{ display: 'flex' }}>
        <div
          className="notion-cursor-default"
          style={{ position: 'relative', overflow: 'hidden', flexGrow: 1 }}
        >
          {['mp4'].some((ext) => source.endsWith(`.${ext}`)) ? (
            <video
              style={contentStyle}
              src={`${getApiAssetPath(source, id)}#t=0.001`}
              playsInline
              controls
              preload="metadata"
            />
          ) : (
            <div style={contentStyle}>
              <FrameHeightAdjust>
                <FramePosition>
                  <div style={{ width: '100%', height: '100%' }}>
                    <Frame
                      src={source}
                      sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
                      allowFullScreen
                      loading="lazy"
                      frameBorder="0"
                    />
                  </div>
                </FramePosition>
              </FrameHeightAdjust>
            </div>
          )}
        </div>
      </div>
    </Block>
  )
}
