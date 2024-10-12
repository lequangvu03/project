import { ObjectId } from "mongodb"

interface BookingType {
  booking_id: ObjectId
  customer_name: string
  customer_phone: string
  table_id: number
  booking_time: Date
  details: string
}

export class Booking {
  booking_id: ObjectId
  customer_name: string
  customer_phone: string
  table_id: number
  booking_time: Date
  details: string

  constructor(booking: BookingType) {
    this.booking_id = booking.booking_id
    this.customer_name = booking.customer_name
    this.customer_phone = booking.customer_phone
    this.table_id = booking.table_id
    this.booking_time = booking.booking_time
    this.details = booking.details
  }
}