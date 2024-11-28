import { NextRequest, NextResponse } from 'next/server'
import withAuth from 'next-auth/middleware'
import { routes } from './definitions/constant/routes.constant'
interface NextAuthRequest extends NextRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)'
    }
  ]
}
