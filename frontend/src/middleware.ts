import { NextRequest, NextResponse } from 'next/server'
import withAuth from 'next-auth/middleware'
import { routes } from './definitions/constant/routes.constant'
interface NextAuthRequest extends NextRequest {
  nextauth?: any
}

export default withAuth(
  async (request: NextAuthRequest) => {
    const { pathname } = request.nextUrl
    const isAuthRoutes = routes.authRoutes.includes(pathname)
    const isProtectedRoutes = routes.protectedRoutes.includes(pathname)

    const isAuthenticated = request.nextauth?.token?.isAuthenticated

    if (isAuthenticated && isAuthRoutes) {
      return NextResponse.redirect(new URL('/admin/menu', request.url))
    }

    if (!isAuthenticated && isProtectedRoutes) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    console.log({
      isAuthenticated
    })
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
}
