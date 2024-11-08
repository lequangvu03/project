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
  async checkBookingOverlap(table_number: number, startTime: number, endTime: number) {
    return await databaseService.bookings.findOne({
      table_number,
      booking_time: {
        $lt: endTime,
        $gt: startTime - 2 * 60 * 60 * 1000
      }
    })
  }

  async addBooking(
    customerName: string,
    customerPhone: string,
    tableNumber: number,
    bookingTime: number,
    detailsInput: string
  ) {
    // Bước 1 insert 1 đặt bàn vào DB (do nhân viên thực hiện)
    const newBooking = await databaseService.bookings.insertOne({
      _id: new ObjectId(),
      customer_name: customerName,
      customer_phone: customerPhone,
      table_number: tableNumber,
      booking_time: bookingTime,
      details: detailsInput
    })

    return newBooking
  }

  async updateBookingById(
    id: string,
    customerName: string,
    customerPhone: string,
    tableNumber: number,
    bookingTime: number,
    detailsInput: string
  ) {
    // update booking
    const updatedBooking = await databaseService.bookings.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          customer_name: customerName,
          customer_phone: customerPhone,
          table_number: tableNumber,
          booking_time: bookingTime,
          details: detailsInput
        }
      }
    )
    // Nếu thay đổi table number (old) thành 1 table number khác (new)
    return updatedBooking
  }
  // Hủy booking
  // testing
  async deleteBookingById(id: string) {
    // 1. xóa booking khỏi DB
    const booking = await databaseService.bookings.deleteOne({ _id: new ObjectId(id) })
    return booking
  }
}
const bookingService = new BookingService()
export default bookingService
