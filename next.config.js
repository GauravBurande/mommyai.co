/** @type {import('next').NextConfig} */
module.exports = {
  api: {
    // disables call to body parsing module while deployed
    bodyParser: process.env.NODE_ENV !== 'production',
  },
  reactStrictMode: true,
}
