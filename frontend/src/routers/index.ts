import { sidebarIcon } from '~/assets/images'
import { PermissionType } from '~/definitions/constant/types.constant'

export const employeeRoutes = [
  { name: 'Menu', image: sidebarIcon.menu, redirect: '/admin/menu', key: PermissionType.Menu },
  { name: 'Inventory', image: sidebarIcon.inventory, redirect: '/admin/inventory', key: PermissionType.Inventory },
  { name: 'Order', image: sidebarIcon.order, redirect: '/admin/order', key: PermissionType.Order }
]

export const adminRoutes = [
  { name: 'Dashboard', image: sidebarIcon.dashboard, redirect: '/admin/dashboard', key: PermissionType.Dashboard },
  { name: 'Staff', image: sidebarIcon.staff, redirect: '/admin/staff', key: PermissionType.Staff },
  ...employeeRoutes
]

export const routes = [...adminRoutes, ...employeeRoutes]
