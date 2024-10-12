import { NextFunction, Request, Response } from 'express'
import { ORDER_MESSAGE } from '~/constants/messages'
import orderServices from '~/services/order.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddOrderReqBody, UpdateOrderReqBody } from '~/models/requests/order.requests'

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
export const addOrderController = async (
  req: Request<ParamsDictionary, any, AddOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  //ep kieu customer_id và cái list order item_id
  const result = await orderServices.addOrder(
    req.body.table_number,
    req.body.order_items,
    req.body.total_price,
    req.body.payment_status,
    req.body.order_status
  )
  return res.status(200).json({ message: ORDER_MESSAGE.ADD_MENU_ITEM_SUCCESS, result })
}
export const updateOrderController = async (
  req: Request<ParamsDictionary, any, UpdateOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params // OrderId from URL
    const order_data = req.body // Data to update from request body

    const updatedOrder = await orderServices.updateOrder(orderId, order_data)

    return res.status(200).json({
      message: ORDER_MESSAGE.UPDATE_ORDER_SUCCESS,
      result: updatedOrder
    })
  } catch (error) {
    next(error)
  }
}
export const deleteOrderController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params // OrderId from URL

    const result = await orderServices.deleteOrder(orderId)

    return res.status(200).json({
      message: ORDER_MESSAGE.DELETE_ORDER_SUCCESS,
      result
    })
  } catch (error) {
    next(error)
  }
}
