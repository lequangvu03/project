import { ObjectId } from 'mongodb'

interface TableType {
  table_id: ObjectId
  table_number: number
  status: number
  capacity: number
  location: string
}

export class Table {
  table_id: ObjectId
  table_number: number
  status: number
  capacity: number
  location: string

  constructor(table: TableType) {
    this.table_id = table.table_id
    this.table_number = table.table_number
    this.status = table.status
    this.capacity = table.capacity
    this.location = table.location
  }
}
