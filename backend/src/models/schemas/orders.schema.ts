import { ObjectId } from 'mongodb'

interface OrderType {
  _id?: ObjectId
  order_time: Date
  table_number: number
  order_item_ids: ObjectId[]
  total_price: number
  payment_status: string
  order_status: string
  created_at?: number
  updated_at?: number
}

export default class Order {
  _id?: ObjectId
  table_number: number
  order_time: Date
  total_price: number
  order_item_ids: ObjectId[]
  payment_status: string
  order_status: string
  created_at: number
  updated_at: number

  constructor(order: OrderType) {
    const date = Date.now()
    this._id = order._id
    this.order_time = order.order_time || date
    this.table_number = order.table_number
    this.order_item_ids = order.order_item_ids
    this.total_price = order.total_price
    this.payment_status = order.payment_status
    this.order_status = order.order_status
    this.created_at = order.created_at || date
    this.updated_at = order.updated_at || date
  }
}
