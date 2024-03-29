/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_INTEGRATION_TOKEN: process.env.NOTION_INTEGRATION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    BASE_URL: process.env.BASE_URL,
    GTM_ID: process.env.GTM_ID,
    USER_LOCALE: process.env.USER_LOCALE,
    USER_TIMEZONE: process.env.USER_TIMEZONE,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost', 'kondo-blog.vercel.app'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
