import { ObjectId } from 'mongodb'

interface InventoryLogType {
  item_id: ObjectId
  change_type: string
  change_quantity: number
  change_date: Date
}

export default class InventoryLog {
  item_id: ObjectId
  change_type: string
  change_quantity: number
  change_date: Date

  constructor(log: InventoryLogType) {
    this.item_id = log.item_id
    this.change_type = log.change_type
    this.change_quantity = log.change_quantity
    this.change_date = log.change_date
  }
}
