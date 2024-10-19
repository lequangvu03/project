import { sidebarIcon } from "~/assets/images";

export const publicRoutes = [
    {   name: "Menu", image: sidebarIcon.menu, redirect: "/admin/menu" },
    {   name: "Inventory", image: sidebarIcon.inventory, redirect: "/admin/inventory" },
    {   name: "Report", image: sidebarIcon.report, redirect: "/admin/report" },
    {   name: "Order", image: sidebarIcon.order, redirect: "/admin/order" },
    {   name: "Reservation", image: sidebarIcon.reservation, redirect: "/admin/reservation" },
    {   name: "Dashboard", image: sidebarIcon.dashboard, redirect: "/admin/dashboard" },
    {   name: "Staff", image: sidebarIcon.staff, redirect: "/admin/staff" },
]