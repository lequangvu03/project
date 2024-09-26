import { ObjectId } from 'mongodb'

interface CustomerType {
  _id?: ObjectId
  name: string
  phone: string
}

export default class Customer {
  _id?: ObjectId
  name: string
  phone: string

  constructor(customer: CustomerType) {
    this._id = customer._id
    this.name = customer.name
    this.phone = customer.phone
  }
}
