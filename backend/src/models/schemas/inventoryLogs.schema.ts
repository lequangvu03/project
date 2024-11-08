import { ObjectId } from 'mongodb'
import { ChangeType } from '~/constants/enums'

interface InventoryLogType {
  _id?: ObjectId
  item_id: ObjectId
  change_type: ChangeType
  change_quantity: number
  change_date: number
}

export default class InventoryLog {
  _id?: ObjectId
  item_id: ObjectId
  change_type: ChangeType
  change_quantity: number
  change_date: number

  constructor(log: InventoryLogType) {
    const date = Date.now()
    this._id = log._id
    this.item_id = log.item_id
    this.change_type = log.change_type
    this.change_quantity = log.change_quantity
    this.change_date = log.change_date || date
  }
}
