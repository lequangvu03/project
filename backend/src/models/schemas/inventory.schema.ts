import { ObjectId } from 'mongodb'

interface InventoryItemType {
  _id?: ObjectId
  item_name: string
  quantity_available: number
  reorder_level: number
  supplier: string
  last_restock_date?: number
  created_at?: number
  updated_at?: number
}

export default class InventoryItem {
  _id?: ObjectId
  item_name: string
  quantity_available: number
  reorder_level: number
  supplier: string
  last_restock_date: number
  created_at: number
  updated_at: number

  constructor(inventoryItem: InventoryItemType) {
    const date = Date.now()
    this._id = inventoryItem._id
    this.item_name = inventoryItem.item_name
    this.quantity_available = inventoryItem.quantity_available
    this.reorder_level = inventoryItem.reorder_level
    this.supplier = inventoryItem.supplier
    this.last_restock_date = inventoryItem.last_restock_date || date
    this.created_at = inventoryItem.created_at || date
    this.updated_at = inventoryItem.updated_at || date
  }
}
