import { Router } from 'express'
import { getAllOrdersController, addOrderController } from '~/controllers/order.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
export const ordersRouter = Router()
/**
 * path: api/orders/
 * method: GET
 * description: Get all orders
 * response: {message: string, result: {tables: OrderType[], total: number}}
 * */
ordersRouter.get('', wrapRequestHandler(getAllOrdersController))

/**
 * path: api/orders/
 * method: POST
 * description: create a new order
 * response: {message: string, result: OrderType}
 * */
ordersRouter.post('/create', wrapRequestHandler(addOrderController))
