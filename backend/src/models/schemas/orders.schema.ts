import { ObjectId } from 'mongodb'

interface OrderItemType {
  item_id: ObjectId
  quantity: number
  price_per_item: number
}
interface OrderType {
  _id?: ObjectId
  order_time?: number
  table_number: number
  order_items: OrderItemType[]
  total_price: number
  payment_status: number
  order_status: number
  created_at?: number
  updated_at?: number
}

export default class Order {
  _id?: ObjectId
  table_number: number
  order_time: number
  total_price: number
  order_items: OrderItemType[]
  payment_status: number
  order_status: number
  created_at: number
  updated_at: number

  constructor(order: OrderType) {
    const date = Date.now()
    this._id = order._id
    this.order_time = order.order_time || date
    this.table_number = order.table_number
    this.order_items = order.order_items
    this.total_price = order.total_price
    this.payment_status = order.payment_status
    this.order_status = order.order_status
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}
