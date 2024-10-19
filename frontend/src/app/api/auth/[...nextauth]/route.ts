/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { EntityError } from '~/api/http'
import { publicPost } from '~/api/request'
/**
 * Config next-auth options protecting routes
 * Refer https://next-auth.js.org/configuration/providers/credentials#how-to
 */
const nextAuthOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        try {
          const { email, password } = credentials
          const res = await publicPost('/auth/login', { email, password })
          if (res.result) {
            return res.result
          }
        } catch (error: any) {
          throw new Error(
            JSON.stringify(
              new EntityError({
                status: error?.status,
                payload: error?.response?.data
              })
            )
          )
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET || '',
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === 'google') {
        return profile.email_verified
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    /**
     * The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout)
     */
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url
      }

      return baseUrl
    },
    /**
     * The session callback is called whenever a session is checked
     * e.g.: calls to getSession(), useSession(), or request to /api/auth/session
     * Refer: https://next-auth.js.org/configuration/callbacks#session-callback
     */

    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      const currentTime = Date.now() / 1000
      if (token.accessTokenExpires && currentTime + 1800 >= token.accessTokenExpires) {
        session.isAuthenticated = false
      } else {
        session.isAuthenticated = true
      }
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.accessTokenExpires = token.exp
      session.role = token?.role
      return session
    },
    /**
     * This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client)
     * e.g.: requests to /api/auth/signin, /api/auth/session and calls to getSession(), getServerSession(), useSession()
     * Refer: https://next-auth.js.org/configuration/callbacks#jwt-callback
     */
    async jwt({ token, user, account }: any) {
      const currentTime = Date.now() / 1000
      if (user) {
        // Credential sign in
        token.accessToken = user?.access_token || user?.accessToken
        token.refreshToken = user?.refresh_token || user?.refreshToken
        token.accessTokenExpires = user?.exp
        token.role = user?.role
        if (currentTime >= user.exp) {
          token.isAuthenticated = false
        } else {
          token.isAuthenticated = true
        }
      } else if (account) {
        // SSO signin
        token.accessToken = account.access_token || account.accessToken
      }
      if (token.accessTokenExpires && currentTime >= token.accessTokenExpires) {
        try {
          const refreshedTokens = await refreshAccessToken(token.refreshToken)
          if (refreshedTokens) {
            token.accessToken = refreshedTokens.accessToken
            token.accessTokenExpires = refreshedTokens.accessTokenExpires
            token.refreshToken = refreshedTokens.refreshToken
          }
        } catch (error) {
          console.error('Error refreshing access token:', error)
        }
      }
      return token
    }
  }
}

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await publicPost('/auth/refresh-token', { refresh_token: refreshToken })
    return {
      accessToken: response.result.access_token,
      accessTokenExpires: response.result.exp,
      refreshToken: response.result.refresh_token
    }
  } catch (error) {
    console.error('Failed to refresh access token:', error)
    // throw new Error('Failed to refresh access token');
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
