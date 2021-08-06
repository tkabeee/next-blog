module.exports = {
  reactStrictMode: true,
  env: {
    NOTION_INTEGRATION_TOKEN: process.env.NOTION_INTEGRATION_TOKEN,
    BASE_URL: process.env.BASE_URL,
    GTM_ID: process.env.GTM_ID,
    USER_LOCALE: process.env.USER_LOCALE,
    USER_TIMEZONE: process.env.USER_TIMEZONE,
  },
  images: {
    domains: ['localhost'],
  },
}
