import { Router } from 'express'
import {
  addInboundOrdersController,
  deleteInboundOrdersController,
  getAllInboundOrderController,
  updateInboundOrdersController
} from '~/controllers/inboundOrder.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  addInboundOrdersValidator,
  deleteInboundOrdersValidator,
  updateInboundOrdersValidator
} from '~/middlewares/inboundOrder.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const inboundOrderRouter = Router()

/**
 * path: api/inbound-order/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all inbound order
 * response: {message: string, result: {inboundOrders: InboundOrderType[], total: number}}
 * */

inboundOrderRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllInboundOrderController))

/**
 * path: api/inbound-order/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {total_price: number, inbound_order_items: InboundOrderItemType[]}
 * description: Create an inbound order
 * response: {message: string, result: InboundOrderType} 
  example request: 
  {
    "total_price": 120000, 
    "inbound_order_items": [{"quantity": 10, "item_id": "674a77d3b35b6c1cf234433d"}]
  }
* */

inboundOrderRouter.post('/', accessTokenValidator, wrapRequestHandler(addInboundOrdersController))
/**
 * path: api/inbound-order/:id
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {total_price: number, inbound_order_items: InboundOrderItemType[]}
 * description: Update an inbound order
 * response: {message: string, result: InboundOrderType}
 * */
inboundOrderRouter.put('/:id', accessTokenValidator, wrapRequestHandler(updateInboundOrdersController))

/**
 * path: api/inbound-order/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {}
 * description: Delete an inbound order
 * response: {message: string, result: InboundOrderType}
 * */
inboundOrderRouter.delete(
  '/:id',
  accessTokenValidator,
  deleteInboundOrdersValidator,
  wrapRequestHandler(deleteInboundOrdersController)
)
