/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't use static export - we need API routes for authentication and database
  // output: 'export',
  
  // Image optimization settings
  images: {
    unoptimized: true
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
      allowedOrigins: ['cc.willer-hansen.dk', 'localhost']
    }
  }
}

module.exports = nextConfig;