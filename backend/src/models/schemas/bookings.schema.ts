import { ObjectId } from 'mongodb'

interface BookingType {
  _id?: ObjectId
  customer_name: string
  customer_phone: string
  table_number: number
  booking_time: number
  details?: string
}

export default class Booking {
  _id?: ObjectId
  customer_name: string
  customer_phone: string
  table_number: number
  booking_time: number
  details?: string

  constructor(booking: BookingType) {
    this._id = booking._id
    this.customer_name = booking.customer_name
    this.customer_phone = booking.customer_phone
    this.table_number = booking.table_number
    this.booking_time = booking.booking_time
    this.details = booking.details
  }
}
