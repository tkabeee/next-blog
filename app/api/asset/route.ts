// ref: https://github.com/ijjk/notion-blog/blob/main/src/pages/api/asset.ts

import { NextRequest, NextResponse } from 'next/server'
import { notionAssetUrls } from '@/lib/notion/api/notionAssetUrls'
import {
  setHeaders,
  handleData,
  handleError,
  Headers,
} from '@/lib/notion/api/utils'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  let headers: Headers = {}
  headers = setHeaders(headers)

  if (req.method === 'OPTIONS') {
    return NextResponse.json(null, { status: 200, headers })
  }

  try {
    const searchParams = req.nextUrl.searchParams
    const assetUrl = searchParams.get('assetUrl')
    const blockId = searchParams.get('blockId')

    if (!assetUrl || !blockId) {
      return handleData({
        status: 'error',
        message: 'asset url or blockId missing',
      })
    } else {
      // we need to re-encode it since it's decoded when added to req.query
      const { signedUrls = [], ...urlsResponse } = await notionAssetUrls(
        assetUrl,
        blockId
      )

      if (signedUrls.length === 0) {
        console.error('Failed to get signedUrls', urlsResponse)
        return handleData({
          status: 'error',
          message: 'Failed to get asset URL',
        })
      }

      return new NextResponse(null, {
        headers: { ...headers, Location: signedUrls.pop() || '' },
        status: 307,
      })
    }
  } catch (e) {
    if (e instanceof Error) {
      return handleError(e)
    }
  }
}
