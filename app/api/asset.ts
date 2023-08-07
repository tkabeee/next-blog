// https://github.com/ijjk/notion-blog/blob/main/src/pages/api/asset.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { notionAssetUrls } from '@/lib/notion/api/notionAssetUrls'
import { setHeaders, handleData, handleError } from '@/lib/notion/api/utils'

const notionAssetApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (setHeaders(req, res)) return
  try {
    const { assetUrl, blockId } = req.query as { [k: string]: string }

    if (!assetUrl || !blockId) {
      handleData(res, {
        status: 'error',
        message: 'asset url or blockId missing',
      })
    } else {
      // we need to re-encode it since it's decoded when added to req.query
      const { signedUrls = [], ...urlsResponse } = await notionAssetUrls(
        res,
        assetUrl,
        blockId
      )

      if (signedUrls.length === 0) {
        console.error('Failed to get signedUrls', urlsResponse)
        return handleData(res, {
          status: 'error',
          message: 'Failed to get asset URL',
        })
      }

      res.status(307)
      res.setHeader('Location', signedUrls.pop() || '')
      res.end()
    }
  } catch (e) {
    if (e instanceof Error) {
      handleError(res, e)
    }
  }
}

export default notionAssetApi
