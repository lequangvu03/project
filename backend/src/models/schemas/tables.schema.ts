import { ObjectId } from 'mongodb'

interface TableType {
  table_id: ObjectId
  table_number: number
  status: number
  capacity: number
  location: string
  created_at?: number
  updated_at?: number
}

export default class Table {
  table_id: ObjectId
  table_number: number
  status: number
  capacity: number
  location: string
  created_at?: number
  updated_at?: number

  constructor(table: TableType) {
    const date = Date.now()
    this.table_id = table.table_id
    this.table_number = table.table_number
    this.status = table.status
    this.capacity = table.capacity
    this.location = table.location
    this.created_at = table.created_at || date
    this.updated_at = table.updated_at || date
  }
}
