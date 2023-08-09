// ref: https://github.com/ijjk/notion-blog/blob/main/src/components/counter.tsx

import React, { useState } from 'react'

interface Props {
  initialValue: any
}

const Counter = ({ initialValue }: Props) => {
  const [clicks, setClicks] = useState(initialValue)

  return (
    <div style={{ margin: '10px 0 20px' }}>
      <p>Count: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>increase count</button>
      <button onClick={() => setClicks(clicks - 1)}>decrease count</button>
    </div>
  )
}

export default Counter
