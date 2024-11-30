import { Router } from 'express'
import {
  addInboundOrdersController,
  deleteInboundOrdersController,
  getAllInboundOrderController,
  updateInboundOrdersController
} from '~/controllers/inboundOrder.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const inboundOrderRouter = Router()

/**
 * path: api/inbound-order/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all inbound order
 * response: {message: string, result: {employees: InboundOrderType[], total: number}}
 * */

inboundOrderRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllInboundOrderController))

/**
 * path: api/inbound-order/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * description: create an inbound order
 * response: {message: string, result: {inbound-order: InboundOrderType}}
 * */

inboundOrderRouter.post('/', accessTokenValidator, wrapRequestHandler(addInboundOrdersController))
/**
 * path: api/employee/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, contact_info: string, position: string, salary: number}
 * description: Update a employee
 * response: {message: string, result: EmployeeType}
 * */
inboundOrderRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateInboundOrdersController))

/**
 * path: api/employee/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a employee
 * response: {message: string, result: EmployeeType}
 * */
inboundOrderRouter.delete('/:id', accessTokenValidator, wrapRequestHandler(deleteInboundOrdersController))
