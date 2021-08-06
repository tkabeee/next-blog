module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    GTM_ID: process.env.GTM_ID,
    USER_LOCALE: process.env.USER_LOCALE,
    USER_TIMEZONE: process.env.USER_TIMEZONE,
  },
  distDir: 'build',
  cleanDistDir: true,
  images: {
    domains: ['localhost'],
  },
}
