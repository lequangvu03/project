import { ObjectId } from 'mongodb'

interface SoldItemType {
  _id?: ObjectId
  item_id: ObjectId
  item_name: string
  quantity_sold: number
  revenue_generated: number
}

export default class SoldItem {
  _id?: ObjectId
  item_id: ObjectId
  item_name: string
  quantity_sold: number
  revenue_generated: number

  constructor(soldItem: SoldItemType) {
    this._id = soldItem._id
    this.item_id = soldItem.item_id
    this.item_name = soldItem.item_name
    this.quantity_sold = soldItem.quantity_sold
    this.revenue_generated = soldItem.revenue_generated
  }
}
