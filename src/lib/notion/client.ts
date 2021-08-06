const { Client, APIErrorCode, LogLevel } = require('@notionhq/client')

const isProd = process.env.NODE_ENV === 'production'

class Singleton {
  private static instance: typeof Client
  private constructor() {}
  public static getInstance(): typeof Client {
    if (!Singleton.instance) {
      Singleton.instance = new Client({
        auth: process.env.NOTION_INTEGRATION_TOKEN,
        LogLevel: isProd ? LogLevel.ERROR : LogLevel.DEBUG,
      })
    }
    return Singleton.instance
  }
}

export const notion = Singleton.getInstance()

export { APIErrorCode }
