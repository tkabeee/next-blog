import styled from 'styled-components'

interface Props {
  children: any
  number: number
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

const ItemType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 2px;
  width: 24px;
  min-height: calc(${fontSize} + 6px);
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

export const NotionNumberedList = ({ children: content, number }: Props) => {
  return (
    <Block>
      <ListItem>
        <ItemType>
          <span>{number}.</span>
        </ItemType>
        <ItemContentWrap>
          <ItemContent>{content}</ItemContent>
        </ItemContentWrap>
      </ListItem>
    </Block>
  )
}
