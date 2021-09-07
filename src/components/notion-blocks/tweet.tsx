import { useEffect, useRef } from 'react'
import styled from 'styled-components'

interface Props {
  id: string
  tweetId: string
}

const Block = styled.div`
  align-self: center;
  margin-top: 4px;
  margin-bottom: 4px;
  width: 100%;
`

const Position = styled.div`
  position: relative;
  overflow: visible;
  flex-grow: 1;
`

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 420px;
  min-width: 0px;
  width: 100%;
`

const WidgetWrap = styled.div`
  width: 100%;
  min-width: 100%;
  pointer-events: auto;
`

const TwitterWidget = styled.div``

export const NotionTweet = ({ id, tweetId }: Props) => {
  const tweetRef = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (tweetRef && tweetRef.current) {
      if (window?.twttr?.widgets) {
        window.twttr.widgets.createTweet(tweetId, tweetRef.current, {
          width: '480',
          align: 'center',
          theme: 'light',
        })
      }
    }
  })

  return (
    <Block>
      <div style={{ display: 'flex' }}>
        <Position className="notion-cursor-default">
          <div style={{ display: 'flex' }}>
            <Content>
              <WidgetWrap>
                <TwitterWidget id={id} ref={tweetRef} />
              </WidgetWrap>
            </Content>
          </div>
        </Position>
      </div>
    </Block>
  )
}
