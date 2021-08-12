export const Heading = ({
  children: component,
  id: blockId,
  Type,
}: {
  children: any,
  id: string,
  Type: string | React.ComponentType
}) => {
  return (
    <div id={blockId}>
      <Type>{component}</Type>
    </div>
  )
}
