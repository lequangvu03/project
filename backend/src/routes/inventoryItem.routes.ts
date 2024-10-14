import { Router } from 'express'
import {
  addInventoryItemController,
  deleteInventoryItemController,
  getAllInventoryItemsController,
  updateInventoryItemController
} from '~/controllers/inventoryItem.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

// 1. Thêm hàng mới vào kho
export const inventoryItemRouter = Router()

/**
 * path: api/booking/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all bookings
 * response: {message: string, result: {bookings: BookingType[], total: number}}
 * */

inventoryItemRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllInventoryItemsController))

/**
 * path: api/booking/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {customer_name: string, customer_phone: string, table_number: number, details: string}
 * description: Add a new table
 * response: {message: string, result: BookingType}
 * */

// TODO: addBookingValidator
inventoryItemRouter.post('/', accessTokenValidator, wrapRequestHandler(addInventoryItemController))

/**
 * path: api/table/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number, seat_number: number}
 * description: Update a table
 * response: {message: string, result: TableType}
 * */
inventoryItemRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateInventoryItemController))

/**
 * path: api/table/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a table
 * response: {message: string, result: TableType}
 * */
inventoryItemRouter.delete('/:id', accessTokenValidator, wrapRequestHandler(deleteInventoryItemController))
