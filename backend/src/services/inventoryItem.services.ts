import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import tableService from './table.services'

class InventoryItemsService {
  async getAllInventoryItems() {
    const inventoryItems = await databaseService.bookings.find().toArray()
    const total = await databaseService.bookings.countDocuments()
    return { inventoryItems, total }
  }

  async addBooking(
    customerName: string,
    customerPhone: string,
    tableNumber: number,
    bookingTime: Date,
    detailsInput: string
  ) {
    // Bước 1 insert 1 đặt bàn vào DB (do nhân viên thực hiện)
    const bookingId = new ObjectId()
    const newBooking = await databaseService.bookings.insertOne({
      _id: bookingId,
      booking_id: bookingId,
      customer_name: customerName,
      customer_phone: customerPhone,
      table_number: tableNumber,
      booking_time: bookingTime,
      details: detailsInput
    })
    // check xem bàn đã có người đặt hay ngồi chưa ?
    const foundTable = await tableService.checkTableExist(tableNumber)
    if (foundTable?.status == 1) throw new Error('Table is reserved! Please book a different table')
    // Bước 2: Cập nhật trạng thái bàn thành "Reserved" hoặc busy
    const updatedStatusTable = await databaseService.tables.updateOne(
      {
        table_number: tableNumber
      },
      {
        $set: {
          status: TableStatus.Busy
        }
      }
    )

    return { newBooking, updatedStatusTable }
  }
  async updateBooking(id: string, seatNumber: number) {
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
  async deleteBooking(id: string) {
    const table = await databaseService.tables.deleteOne({ _id: new ObjectId(id) })
    return table
  }
}
const inventoryItemsService = new InventoryItemsService()
export default inventoryItemsService
