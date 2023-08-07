// https://github.com/ijjk/notion-blog/blob/main/src/lib/notion/getPageData.ts

import rpc, { values } from './api/rpc'

export const getPageData = async (pageId: string) => {
  // a reasonable size limit for the largest blog post (1MB),
  // as one chunk is about 10KB
  const maximumChunckNumer = 100

  try {
    var chunkNumber = 0
    var data = await loadPageChunk({ pageId, chunkNumber })
    var blocks = data.recordMap.block

    while (data.cursor.stack.length !== 0 && chunkNumber < maximumChunckNumer) {
      chunkNumber = chunkNumber + 1
      data = await loadPageChunk({ pageId, chunkNumber, cursor: data.cursor })
      if ('block' in data.recordMap) {
        blocks = Object.assign(blocks, data.recordMap.block)
      }
    }

    const blockArray = blocks ? values(blocks) : []
    // remove table blocks
    // if (blockArray[0] && blockArray[0].value.content) {
    //   blockArray[0] type: page, parent_table: collection
    //   blockArray[1] type: collection_view, parent_table: block
    //   blockArray[2] type: page, parent_table: space
    // }
    if (blockArray.length > 0) {
      blockArray.splice(0, 3)
    }
    return { blocks: blockArray }
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err)
    return { blocks: [] }
  }
}

export function loadPageChunk({
  pageId,
  limit = 30,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false,
}: any) {
  return rpc('loadCachedPageChunk', {
    page: { id: pageId },
    limit,
    cursor,
    chunkNumber,
    verticalColumns,
  })
}
