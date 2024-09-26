import { ObjectId } from 'mongodb'

interface TableType {
  _id?: ObjectId
  table_number: number
  status: number // 0: empty, 1: busy
  current_order_id?: ObjectId
  seat_number?: number
  created_at?: number
  updated_at?: number
}

export default class Table {
  _id?: ObjectId
  table_number: number
  status: number
  current_order_id?: ObjectId
  seat_number?: number
  created_at: number
  updated_at: number

  constructor(table: TableType) {
    const date = Date.now()
    this._id = table._id
    this.table_number = table.table_number
    this.status = table.status
    this.current_order_id = table.current_order_id
    this.seat_number = table.seat_number || 2
    this.created_at = table.created_at || date
    this.updated_at = table.updated_at || date
  }
}
