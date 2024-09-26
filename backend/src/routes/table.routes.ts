import { Router } from 'express'
import {
  addTableController,
  deleteTableController,
  getAllTableController,
  updateTableController
} from '~/controllers/table.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { addTableValidator, deleteTableValidator, updateTableValidator } from '~/middlewares/table.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const tableRouter = Router()

/**
 * path: api/table/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all tables
 * response: {message: string, result: {tables: TableType[], total: number}}
 * */

tableRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllTableController))

/**
 * path: api/table/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number, seat_number: number}
 * description: Add a new table
 * response: {message: string, result: TableType}
 * */
tableRouter.post('/', accessTokenValidator, addTableValidator, wrapRequestHandler(addTableController))

/**
 * path: api/table/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number, seat_number: number}
 * description: Update a table
 * response: {message: string, result: TableType}
 * */
tableRouter.put('/:id', accessTokenValidator, updateTableValidator, wrapRequestHandler(updateTableController))

/**
 * path: api/table/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a table
 * response: {message: string, result: TableType}
 * */
tableRouter.delete('/:id', accessTokenValidator, deleteTableValidator, wrapRequestHandler(deleteTableController))
