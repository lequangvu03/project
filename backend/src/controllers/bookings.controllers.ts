import { NextFunction, Request, Response } from 'express'
import { BOOKING_MESSAGE } from '~/constants/messages'
import bookingService from '~/services/booking.services'

export const getAllBookingsController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await bookingService.getAllBookings()
  return res.status(200).json({ message: BOOKING_MESSAGE.GET_ALL_BOOKING_SUCCESS, result })
}
// req.body sẽ cần truyền vào (customer_name, bookingService, table_id, details)
// testing table number = 5, booking_time = 2/23/2024
export const addBookingController = async (req: Request, res: Response, error: NextFunction) => {
  const { customer_name, customer_phone, table_number, booking_time, details } = req.body
  const newBooking = await bookingService.addBooking(customer_name, customer_phone, table_number, booking_time, details)
  return res.status(201).json({ message: BOOKING_MESSAGE.ADD_NEW_BOOKING_SUCCESS, newBooking })
}
// req.params (id), req.body(customer_name, customer_phone, table_number, booking_time, details)
export const updateBookingController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id
  const { customer_name, customer_phone, table_number, booking_time, details } = req.body
  const result = await bookingService.updateBookingById(
    id,
    customer_name,
    customer_phone,
    table_number,
    booking_time,
    details
  )
  return res.status(200).json({ message: BOOKING_MESSAGE.UPDATE_BOOKING_SUCCESS, result })
}
export const deleteBookingController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await bookingService.deleteBookingById(req.params.id)
  return res.status(200).json({ message: BOOKING_MESSAGE.DELETE_BOOKING_SUCCESS, result })
}
