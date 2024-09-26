import { ObjectId } from 'mongodb'

interface PaymentType {
  _id?: ObjectId
  order_id: ObjectId
  customer_id: ObjectId
  payment_method: string
  amount: number
  payment_status: string
  transaction_date: number
}

export default class Payment {
  _id?: ObjectId
  order_id: ObjectId
  customer_id: ObjectId
  payment_method: string
  amount: number
  payment_status: string
  transaction_date: number

  constructor(payment: PaymentType) {
    this._id = payment._id
    this.order_id = payment.order_id
    this.customer_id = payment.customer_id
    this.payment_method = payment.payment_method
    this.amount = payment.amount
    this.payment_status = payment.payment_status
    this.transaction_date = payment.transaction_date || Date.now()
  }
}
