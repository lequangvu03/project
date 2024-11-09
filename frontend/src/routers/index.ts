import { sidebarIcon } from '~/assets/images'

export const employeeRoutes = [
  { name: 'Menu', image: sidebarIcon.menu, redirect: '/admin/menu' },
  { name: 'Inventory', image: sidebarIcon.inventory, redirect: '/admin/inventory' },
  { name: 'Order', image: sidebarIcon.order, redirect: '/admin/order' },
  { name: 'Reservation', image: sidebarIcon.reservation, redirect: '/admin/reservation' }
]

export const adminRoutes = [
  { name: 'Dashboard', image: sidebarIcon.dashboard, redirect: '/admin/dashboard' },
  { name: 'Report', image: sidebarIcon.report, redirect: '/admin/report' },
  ...employeeRoutes
]
