import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🦞 Command Center V2 - Simon Willer',
  description: 'Professional AI-powered Command Center for project and agent management',
  keywords: 'project management, AI agents, dashboard, kanban, task management',
  authors: [{ name: 'Anders AI Agent' }],
  robots: 'noindex, nofollow', // Keep private
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}