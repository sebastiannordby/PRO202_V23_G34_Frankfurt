/** @type {import('next').NextConfig} */
const nextConfig = {
    darkmode: false,
    env: {
        GOOGLE_ID: '11742604971-4loscbibrae5ak24t2lj5t133e15q3ag.apps.googleusercontent.com',
        GOOGLE_SECRET: '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',
        NEXTAUTH_SECRET: 'test',
        MONGODB_URI: 'mongodb+srv://Frankfurt:admin@cluster0.skgumxy.mongodb.net/?retryWrites=true&w=majority'
    },
    images: {
        remotePatterns: [

        ]
    }
}

module.exports = nextConfig
