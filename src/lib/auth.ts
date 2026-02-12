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
            throw new Error('No user found')
          }

          // For development, allow simple password check
          const isValidPassword = user.password === credentials.password || 
            await bcrypt.compare(credentials.password, user.password)

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