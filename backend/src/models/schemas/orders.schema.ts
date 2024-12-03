import { ObjectId } from 'mongodb'
import { OrderStatus, PaymentStatus } from '~/constants/enums'

interface OrderItemType {
  item_id: ObjectId
  quantity: number
}
interface OrderType {
  _id?: ObjectId
  order_time?: number
  table_number: number
  order_items: OrderItemType[]
  total_price: number
  payment_status: PaymentStatus
  order_status: OrderStatus
  created_at?: number
  updated_at?: number
}

export default class Order {
  _id?: ObjectId
  table_number: number
  order_time: number
  total_price: number
  order_items: OrderItemType[]
  payment_status: PaymentStatus
  order_status: OrderStatus
  created_at: number
  updated_at: number

  constructor(order: OrderType) {
    const date = Date.now()
    this._id = order._id
    this.order_time = order.order_time || date
    this.table_number = order.table_number
    this.order_items = order.order_items
    this.total_price = order.total_price
    this.payment_status = order.payment_status || PaymentStatus.Unpaid
    this.order_status = order.order_status || OrderStatus.Pending
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}
