/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        'wallet.vndc.io',
        'test.nami.exchange',
        'static.namifutures.com',
        'sgp1.digitaloceanspaces.com',
        'nami.io',
        'datav2.nami.exchange',
        'blog.nami.today',
        'data-test.bitbattle.io',
        'nami-dev.sgp1.digitaloceanspaces.com',
        's3-ap-southeast-1.amazonaws.com',
        'thao68.com',
        'lh3.googleusercontent.com',
        'blog.nami.exchange',
        's2.coinmarketcap.com'
    ],
},
}

module.exports = nextConfig
