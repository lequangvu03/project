import { ObjectId } from 'mongodb'

interface OrderHistoryType {
  _id?: ObjectId
  customer_id: ObjectId
  order_id: ObjectId
  order_date: number
  order_status: string
}

export default class OrderHistory {
  _id?: ObjectId
  customer_id: ObjectId
  order_id: ObjectId
  order_date: number
  order_status: string

  constructor(orderHistory: OrderHistoryType) {
    this._id = orderHistory._id
    this.customer_id = orderHistory.customer_id
    this.order_id = orderHistory.order_id
    this.order_date = orderHistory.order_date
    this.order_status = orderHistory.order_status
  }
}
