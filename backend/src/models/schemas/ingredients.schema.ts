import { ObjectId } from 'mongodb'

interface ingredientsType {
  _id?: ObjectId
  name: string
  stock: string
  unit: string // ví dụ : gram,lít,cái
}

export default class ingredients {
  _id?: ObjectId
  name: string
  stock: string
  unit: string

  constructor(item: ingredientsType) {
    this._id = item._id
    this.name = item.name
    this.stock = item.stock
    this.unit = item.unit
  }
}
