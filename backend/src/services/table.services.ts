import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'

class TableService {
  async checkTableExist(tableNumber: number) {
    const table = await databaseService.tables.findOne({ table_number: tableNumber })
    return table
  }
  async getAllTables() {
    const tables = await databaseService.tables.find().toArray()
    const total = await databaseService.tables.countDocuments()
    return { tables, total }
  }
  async addTable(tableNumber: number, capacity: number, location: string) {
    const table = await databaseService.tables.insertOne({
      table_id: new ObjectId(),
      table_number: tableNumber,
      status: TableStatus.Empty,
      capacity: capacity,
      location: location
    })
    return table
  }
  async updateTable(id: string, seatNumber: number) {
    const table = await databaseService.tables.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          seat_number: seatNumber,
          updated_at: Date.now()
        }
      }
    )
    return table
  }
  async deleteTable(id: string) {
    const table = await databaseService.tables.deleteOne({ _id: new ObjectId(id) })
    return table
  }
}
const tableService = new TableService()
export default tableService
