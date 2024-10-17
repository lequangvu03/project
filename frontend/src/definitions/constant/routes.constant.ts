const AUTH_ROUTES = ['/auth/login']
const PROTECTED_ROUTES = [
  '/admin/dashboard',
  '/admin/inventory',
  '/admin/menu',
  '/admin/profile',
  '/admin/report',
  '/admin/reservation/[id]',
  '/admin/notification',
  '/admin/order',
  '/admin/staff',
  '/admin/table'
]

export const routes = {
  authRoutes: AUTH_ROUTES,
  protectedRoutes: PROTECTED_ROUTES
}
