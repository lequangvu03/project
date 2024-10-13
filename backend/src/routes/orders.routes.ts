import { Router } from 'express'
import {
  getAllOrdersController,
  addOrderController,
  updateOrderController,
  deleteOrderController
} from '~/controllers/order.controllers'
import { accessTokenValidator, isAdmin } from '~/middlewares/auth.middlewares'
import { addOrderValidator, deleteOrderValidator, updateOrderValidator } from '~/middlewares/order.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const ordersRouter = Router()

/**
 * path: /orders
 * method: GET
 * description: Get all orders
 * response: { message: string, result: { orders: OrderType[], total: number } }
 * - No request body is needed.
 */
ordersRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllOrdersController))

/**
 * path: /orders
 * method: POST
 * description: Create a new order
 * response: { message: string, result: OrderType }
 *
 * Request Body:
 * {
 *   table_number: number,            // The table number where the order is placed
 *   order_items: Array<{            // List of order items
 *     item_id: string,               // The ID of the menu item
 *     quantity: number,              // Quantity of the item
 *     price_per_item: number        // Price of one unit of the item
 *   }>,
 *   total_price: number,            // Total price of the order
 *   payment_status: 'paid' | 'unpaid', // Payment status of the order
 *   order_status: 'pending' | 'completed' | 'cancelled'  // Status of the order
 * }
 *
 * Validation: Requires `table_number`, `order_items`, `total_price`, `payment_status`, and `order_status`
 */
ordersRouter.post('/', accessTokenValidator, isAdmin, addOrderValidator, wrapRequestHandler(addOrderController))

/**
 * path: /orders/:orderId
 * method: PUT
 * description: Update an existing order by ID
 * response: { message: string, result: OrderType }
 *
 * Request Body (Optional):
 * {
 *   table_number: number,            // The table number where the order is placed (optional)
 *   order_items: Array<{            // List of order items (optional)
 *     item_id: string,               // The ID of the menu item
 *     quantity: number,              // Quantity of the item
 *     price_per_item: number        // Price of one unit of the item
 *   }>,
 *   total_price: number,            // Total price of the order (optional)
 *   payment_status: 'paid' | 'unpaid', // Payment status of the order (optional)
 *   order_status: 'pending' | 'completed' | 'cancelled'  // Status of the order (optional)
 * }
 *
 * Note: Only fields provided will be updated. If a field is omitted, it won't be changed.
 */
ordersRouter.put('/:id', accessTokenValidator, isAdmin, updateOrderValidator, wrapRequestHandler(updateOrderController))

/**
 * path: /orders/:orderId
 * method: DELETE
 * description: Delete an order by ID
 * response: { message: string, result: { deleted: boolean } }
 *
 * Request Parameters:
 * - orderId: string (The ID of the order to be deleted)
 *
 * Response:
 * - { deleted: boolean } indicates whether the deletion was successful.
 */
ordersRouter.delete(
  '/:id',
  accessTokenValidator,
  isAdmin,
  deleteOrderValidator,
  wrapRequestHandler(deleteOrderController)
)
