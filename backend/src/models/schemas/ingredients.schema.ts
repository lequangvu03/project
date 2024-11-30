import { ObjectId } from 'mongodb'

interface ingredientsType {
  _id?: ObjectId
  name: string
  stock: number
  unit: string
  price: number
  created_at?: number
  updated_at?: number
}

export default class ingredients {
  _id?: ObjectId
  name: string
  stock: number
  unit: string
  price: number
  created_at?: number
  updated_at?: number

  constructor(item: ingredientsType) {
    const date = Date.now()
    this._id = item._id
    this.name = item.name
    this.stock = item.stock ? item.stock : 0
    this.unit = item.unit
    this.price = item.price
    this.created_at = item.created_at || date
    this.updated_at = item.updated_at || date
  }
}
