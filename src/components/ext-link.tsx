// https://github.com/ijjk/notion-blog/blob/main/src/components/ext-link.tsx

export const ExtLink = (props: any) => (
  <a
    {...props}
    rel="noopener"
    target={props.target || '_blank'}
    className="break-all"
  />
)
