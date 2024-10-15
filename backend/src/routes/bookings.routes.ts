import { Router } from 'express'
import {
  addBookingController,
  deleteBookingController,
  getAllBookingsController,
  updateBookingController
} from '~/controllers/bookings.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { addBookingValidator, deleteBookingValidator, updateBookingValidator } from '~/middlewares/booking.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const bookingRouter = Router()

/**
 * path: api/booking/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all bookings
 * response: {message: string, result: {bookings: BookingType[], total: number}}
 * */

bookingRouter.get('/', wrapRequestHandler(getAllBookingsController))

/**
 * path: api/booking/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {customer_name: string, customer_phone: string, table_number: number, details: string}
 * description: Add a new table
 * response: {message: string, result: BookingType}
 * */

// TODO: addBookingValidator
bookingRouter.post('/', addBookingValidator, wrapRequestHandler(addBookingController))

/**
 * path: api/booking/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {customer_name: string, customer_phone: string, table_number: number, details: string}
 * description: Update a booking
 * response: {message: string, result: BookingType}
 * */
bookingRouter.put('/:id', updateBookingValidator, wrapRequestHandler(updateBookingController))

/**
 * path: api/booking/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * params: {booking_id: ObjectId}
 * description: Delete a booking
 * response: {message: string, result: BookingType}
 * VD: http://localhost:4000/api/booking/670bf45207887ef825195797
 * */

bookingRouter.delete('/:id', deleteBookingValidator, wrapRequestHandler(deleteBookingController))
