import { ObjectId } from 'mongodb'

interface ingredientsType {
  _id?: ObjectId
  name: string
  stock: number
  unit: string
}

export default class ingredients {
  _id?: ObjectId
  name: string
  stock: number
  unit: string

  constructor(item: ingredientsType) {
    this._id = item._id
    this.name = item.name
    this.stock = item.stock ? item.stock : 0
    this.unit = item.unit
  }
}
