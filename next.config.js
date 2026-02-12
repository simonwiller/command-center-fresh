/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dynamic configuration based on environment
  output: process.env.NODE_ENV === 'production' ? undefined : undefined,
  
  // Image optimization settings
  images: {
    unoptimized: process.env.NODE_ENV === 'production'
  },
  
  // Ensure proper trailing slash behavior
  trailingSlash: true,
  
  // Environment variables for build
  env: {
    DEPLOYMENT_TARGET: 'siteground',
    DOMAIN: 'cc.willer-hansen.dk',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://cc.willer-hansen.dk'
  },
  
  // Experimental features
  experimental: {
    serverActions: {
      allowedOrigins: ['cc.willer-hansen.dk']
    }
  }
}

module.exports = nextConfig;