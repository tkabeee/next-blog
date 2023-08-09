// ref: https://github.com/ijjk/notion-blog/blob/main/src/lib/notion/utils.ts

import { NextResponse } from 'next/server'

export type Headers = {
  [key: string]: string
}

export function setHeaders(headers: Headers): Headers {
  // set SPR/CORS headers
  return {
    ...headers,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 's-maxage=1, stale-while-revalidate',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'pragma',
  }
}

export async function handleData(data: any) {
  data = data || { status: 'error', message: 'unhandled request' }
  const status = data.status !== 'error' ? 200 : 500
  return NextResponse.json(data, { status })
}

export function handleError(error: string | Error): NextResponse {
  console.error(error)
  return NextResponse.json(
    {
      status: 'error',
      message: 'an error occurred processing request',
    },
    { status: 500 }
  )
}
