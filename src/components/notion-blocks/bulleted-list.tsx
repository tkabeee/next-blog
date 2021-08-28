import styled from 'styled-components'

interface Props {
  children: any
}

const fontSize = '1.5em'

const Block = styled.div`
  margin-top: 1px;
  margin-bottom: 1px;
  width: 100%;
`

const ListItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 2px;
  width: 100%;
  color: inherit;
  fill: inherit;
`

const ItemTypeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 2px;
  width: 24px;
  min-height: calc(${fontSize} + 6px);
`

const ItemType = styled.div`
  font-size: ${fontSize};
  line-height: 1;
  margin-bottom: 0.1em;
`

const ItemContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  min-width: 1px;
`

const ItemContent = styled.div`
  padding: 3px 2px;
  width: 100%;
  max-width: 100%;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
`

export const NotionBulletedList = ({ children: content }: Props) => {
  return (
    <Block>
      <ListItem>
        <ItemTypeWrap>
          <ItemType>•</ItemType>
        </ItemTypeWrap>
        <ItemContentWrap>
          <ItemContent>{content}</ItemContent>
        </ItemContentWrap>
      </ListItem>
    </Block>
  )
}
