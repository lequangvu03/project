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
  const data = req.body
  const result = await orderServices.addOrder(data)
  return res.status(200).json({ message: ORDER_MESSAGE.ADD_MENU_ITEM_SUCCESS, result })
}
export const updateOrderController = async (
  req: Request<ParamsDictionary, any, UpdateOrderReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const order_data = req.body
    const updatedOrder = await orderServices.updateOrder(req.params.id, order_data)
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
    const { id } = req.params
    await orderServices.deleteOrder(id)
    return res.status(200).json({
      message: ORDER_MESSAGE.DELETE_ORDER_SUCCESS
    })
  } catch (error) {
    next(error)
  }
}
