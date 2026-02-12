/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export for SiteGround compatibility
  output: 'export',
  
  // Image optimization settings
  images: {
    unoptimized: true
  },
  
  // Ensure proper trailing slash behavior
  trailingSlash: true,
  
  // Environment variables for build
  env: {
    DEPLOYMENT_TARGET: 'siteground',
    DOMAIN: 'cc.willer-hansen.dk'
  }
}

module.exports = nextConfig;