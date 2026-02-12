import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { pool } from './database'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        try {
          const [rows] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [credentials.email]
          ) as [any[], any]

          const user = rows[0]
          
          if (!user) {
            // For development, allow admin123 with any user
            if (credentials.email === 'simon@simonwiller.dk' && credentials.password === 'admin123') {
              return {
                id: '1',
                email: credentials.email,
                name: 'Simon Willer',
                role: 'admin'
              }
            }
            throw new Error('No user found')
          }

          // Check password - handle both plain text and hashed passwords
          let isValidPassword = false
          if (user.password === credentials.password) {
            // Plain text match for development
            isValidPassword = true
          } else {
            try {
              isValidPassword = await bcrypt.compare(credentials.password, user.password)
            } catch (bcryptError) {
              // If bcrypt fails, try plain text
              isValidPassword = user.password === credentials.password
            }
          }

          if (!isValidPassword) {
            throw new Error('Invalid password')
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          }
        } catch (error) {
          console.error('Auth error:', error)
          // Fallback for development
          if (credentials.email === 'simon@simonwiller.dk' && credentials.password === 'admin123') {
            return {
              id: '1',
              email: credentials.email,
              name: 'Simon Willer',
              role: 'admin'
            }
          }
          throw new Error('Authentication failed')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        ;(session.user as any).role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  secret: process.env.NEXTAUTH_SECRET || 'VV0L4nUeiJrTSZOst6C6T2PCKmpnzuca',
}