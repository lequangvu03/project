import { Router } from 'express'
import {
  addBookingController,
  deleteBookingController,
  getAllBookingsController,
  updateBookingController
} from '~/controllers/bookings.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const bookingRouter = Router()

/**
 * path: api/booking/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all bookings
 * response: {message: string, result: {bookings: BookingType[], total: number}}
 * */

bookingRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllBookingsController))

/**
 * path: api/booking/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {customer_name: string, customer_phone: string, table_number: number, details: string}
 * description: Add a new table
 * response: {message: string, result: BookingType}
 * */

// TODO: addBookingValidator
bookingRouter.post('/', accessTokenValidator, wrapRequestHandler(addBookingController))

/**
 * path: api/table/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number, seat_number: number}
 * description: Update a table
 * response: {message: string, result: TableType}
 * */
bookingRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateBookingController))

/**
 * path: api/table/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a table
 * response: {message: string, result: TableType}
 * */
bookingRouter.delete('/:id', accessTokenValidator, wrapRequestHandler(deleteBookingController))
