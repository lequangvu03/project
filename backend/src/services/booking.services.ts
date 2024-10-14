import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import tableService from './table.services'

class BookingService {
  async getAllBookings() {
    const bookings = await databaseService.bookings.find().toArray()
    const total = await databaseService.bookings.countDocuments()
    return { bookings, total }
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
  async updateBooking() {}
  // Hủy booking
  // testing
  async deleteBookingById(id: string) {
    // 1. xóa booking khỏi DB
    const foundBooking = await databaseService.bookings.findOne({ _id: new ObjectId(id) })
    const booking = await databaseService.bookings.deleteOne({ _id: new ObjectId(id) })
    // 2. Cập nhật trạng thái table thành empty vì đã hủy booking
    const tableNumber = foundBooking?.table_number as number
    databaseService.tables.updateOne(
      {
        table_number: tableNumber
      },
      {
        $set: {
          status: TableStatus.Empty
        }
      }
    )
    return booking
  }
}
const bookingService = new BookingService()
export default bookingService
