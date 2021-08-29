import styled from 'styled-components'

import { spacingUnit } from '../../styles/notion.global'

interface Props {
  link: string
  title: string
  description: string
  format: {
    bookmark_icon: string
    bookmark_cover: string
  }
}

const spacingVertical1 = `${Math.floor(spacingUnit * 0.857)}px` // 14px
const spacingVertical2 = `${spacingUnit}px` // 16px
const spacingVertical3 = `${Math.floor(spacingUnit * 1.25)}px` // 20px
const spacingVertical4 = `${Math.floor(spacingUnit * 1.428)}px` // 23px

const fontSizeSm = spacingVertical1
const fontSize = spacingVertical2
const lineHeightSm = spacingVertical3
const lineHeight = spacingVertical4

const Block = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  width: 100%;
`

const Link = styled.a`
  display: block;
  flex-grow: 1;
  min-width: 0px;
  text-decoration: none;
  color: inherit;
`

const Main = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-wrap: wrap-reverse;
  align-items: stretch;
  border: 1px solid rgba(55, 53, 47, 0.16);
  border-radius: 3px;
  overflow: hidden;
  text-align: left;
  color: inherit;
  fill: inherit;
  user-select: none;
  cursor: pointer;
  transition: background 20ms ease-in 0s;
`

const Content = styled.div`
  flex: 4 1 180px;
  padding: ${spacingVertical1} ${spacingVertical2} ${spacingVertical2};
  overflow: hidden;
  text-align: left;
`

const Title = styled.div`
  margin-bottom: 2px;
  min-height: ${Math.floor(spacingUnit * 1.714)}px;
  font-size: ${fontSize};
  line-height: ${lineHeight};
  color: var(--color-link);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
`

const Desciption = styled.div`
  height: ${Math.floor(spacingUnit * 2.666)}px;
  overflow: hidden;
  color: rgba(55, 53, 47, 0.8);
  font-size: ${fontSizeSm};
  line-height: ${lineHeightSm};
`

const LinkTextWrap = styled.div`
  display: flex;
  margin-top: 6px;
`

const Icon = styled.img`
  margin-left: 0;
  margin-right: 6px;
  width: 16px;
  min-width: 16px;
  height: 16px;
`

const LinkText = styled.div`
  overflow: hidden;
  font-size: ${fontSizeSm};
  color: rgba(55, 53, 47, 0.6);
  line-height: ${lineHeightSm};
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Cover = styled.div`
  display: block;
  position: relative;
  flex: 1 1 180px;
`

const ImagePosition = styled.div`
  position: absolute;
  inset: 0px;
`

const ImageWrap = styled.div`
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 1px;
  width: 100%;
  height: 100%;
`

export const NotionBookmark = ({ link, title, description, format }: Props) => {
  const { bookmark_icon: icon, bookmark_cover: cover } = format
  return (
    <Block>
      <div>
        <div style={{ display: 'flex' }}>
          <Link target="_blank" rel="noopener noreferrer" href={link}>
            <Main role="button">
              <Content>
                <Title>{title}</Title>
                <Desciption>{description}</Desciption>
                <LinkTextWrap>
                  {icon && <Icon src={icon} />}
                  <LinkText>{link}</LinkText>
                </LinkTextWrap>
              </Content>
              {cover && (
                <Cover>
                  <ImagePosition>
                    <ImageWrap>
                      <Image src={cover} alt={title} />
                    </ImageWrap>
                  </ImagePosition>
                </Cover>
              )}
            </Main>
          </Link>
        </div>
      </div>
    </Block>
  )
}
