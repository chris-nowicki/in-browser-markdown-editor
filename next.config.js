/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    },
    experimental: {
        fontLoaders: [
            { loader: '@next/font/google', options: { subsets: ['latin'] } },
        ],
    },
}

module.exports = nextConfig
