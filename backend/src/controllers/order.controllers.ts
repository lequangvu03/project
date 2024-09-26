import { NextFunction, Request, Response } from 'express'
import { ORDER_MESSAGE } from '~/constants/messages'
import orderServices from '~/services/order.services'

/**
 * @description: returns a list of all orders for admin to show on the tablet screen
 * @returns a list of orders
 */
export const getAllOrdersController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await orderServices.getAllOrders()
  return res.status(200).json({
    message: ORDER_MESSAGE.GET_ALL_ORDERS_SUCCESS,
    result
  })
}
/**
 * @param (customer_id, table_number, order_item_ids(List of OrderItem's id), total_price, payment_status, order_status)
 * @description:
 * @returns a single order of a customer
 */
export const addOrderController = async (req: Request, res: Response, next: NextFunction) => {
  //ep kieu customer_id và cái list order item_id
  const result = await orderServices.addOrder(
    req.body.customer_id,
    req.body.table_number,
    req.body.order_item_ids,
    req.body.total_price,
    req.body.payment_status,
    req.body.order_status
  )
  return res.status(200).json({ message: ORDER_MESSAGE.ADD_MENU_ITEM_SUCCESS, result })
}
