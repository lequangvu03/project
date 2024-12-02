export interface OrderItem {
  item_id: string
  quantity: number
  item_name: number
  item_price: number
}
export interface InboundOrderItem {
  _id: string
  quantity: number
  item_name: number
  item_price: number
}
export type Ingredient = {
  _id: string
  name: string
  stock: number
  unit: string
  price: number
  created_at: number
  updated_at: number
}

export interface Order {
  _id: string
  table_number: number
  order_time: number
  total_price: number
  order_items: OrderItem[]
  payment_status: number
  order_status: number
  created_at: number
  updated_at: number
}

export interface InboundOrderType {
  _id?: string
  inbound_order_items: InboundOrderItem[]
  total_price: number
  created_at?: number
  updated_at?: number
}
export type Product = {
  _id: string
  name: string
  description: string
  price: number
  tag: number[]
  category_id: string
  stock: number
  image: string
  ingredients: string
  created_at: number
  updated_at: number
  category_name: string
}

export enum NotificationRoleType {
  All,
  Admin,
  Employee
}
export interface NotificationType {
  _id?: string
  recipient: NotificationRoleType
  message: string
  title: string
  status: number
  orderId?: string
  created_at?: number
  updated_at?: number
}

export type TopSellingItem = {
  name: string
  quantity_sold: number
  price: number
  image: string
}

export type RecentOrder = {
  order_id: string
  table_number: number
  order_status: number
  total_price: number
  created_at: number
}

export type ChartData = {
  month: string
  revenue: number
  profit: number
}

export type BusinessData = {
  daily_sales: number
  monthly_revenue: number
  table_occupancy: number
  monthly_profit: number
  top_selling_items: TopSellingItem[]
  recent_orders: RecentOrder[]
  chart_data: ChartData[]
}

export type TProfile = {
  _id: string
  email: string
  password: string
  name: string
  created_at: number
  updated_at: number
  email_verify_token: string
  forgot_password_token: string
  verify: number
  role: number
  avatar_url: string
  permissions: number[]
  ip_address: string
  ipAddress: string[]
}

export type TCategory = {
  _id: string
  name: string
  description: string
  totalProducts: number
}
