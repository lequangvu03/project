import { ObjectId } from 'mongodb'

interface StaffOrderType {
  _id?: ObjectId
  staff_id: ObjectId
  order_id: ObjectId
  status: string
}

export default class StaffOrder {
  _id?: ObjectId
  staff_id: ObjectId
  order_id: ObjectId
  status: string

  constructor(staffOrder: StaffOrderType) {
    this._id = staffOrder._id
    this.staff_id = staffOrder.staff_id
    this.order_id = staffOrder.order_id
    this.status = staffOrder.status
  }
}
