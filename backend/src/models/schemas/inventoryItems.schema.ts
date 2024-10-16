import { ObjectId } from 'mongodb'

interface InventoryItemType {
  _id?: ObjectId
  name: string
  category_id: ObjectId
  quantity: number
  stock: string
  unit_price: number
  status: string
  perishable: boolean
}

export default class InventoryItem {
  _id?: ObjectId
  name: string
  category_id: ObjectId
  quantity: number
  stock: string
  unit_price: number
  status: string
  perishable: boolean

  constructor(item: InventoryItemType) {
    this._id = item._id
    this.name = item.name
    this.category_id = item.category_id
    this.quantity = item.quantity
    this.stock = item.stock
    this.unit_price = item.unit_price
    this.status = item.status
    this.perishable = item.perishable
  }
}
