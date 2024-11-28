import { NextFunction, Request, Response } from 'express'
import { ORDER_MESSAGE } from '~/constants/messages'
import orderServices from '~/services/order.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { AddOrderReqBody, UpdateOrderReqBody } from '~/models/requests/order.requests'
import { io } from '~/utils/socket'
import { ObjectId } from 'mongodb'
import Notification from '~/models/schemas/notifications.schema'
import databaseService from '~/services/database.services'
import { NotificationStatus, NotificationType } from '~/constants/enums'

/**
 * @description: returns a list of all orders for admin to show on the tablet screen
 * @returns a list of orders
 */
export const getAllOrdersController = async (req: Request, res: Response, next: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sortBy = req.query.sortBy as string | undefined
  const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined
  const id = req.query.id as string
  const status = req.query.status as number | undefined
  const table_number = req.query.table_number as number | undefined
  if (id) {
    const result = await orderServices.getOrdersById(id)
    return res.status(200).json({
      message: ORDER_MESSAGE.GET_ALL_ORDERS_SUCCESS,
      result
    })
  }
  const result = await orderServices.getAllOrders({ limit, page, sortBy, sortOrder, status, table_number })
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
  io.emit('new_order', {
    message: 'Có đơn hàng mới!',
    order: result
  })

  await databaseService.notifications.insertOne(
    new Notification({
      _id: new ObjectId(),
      recipient_id: new ObjectId('6708780f6d7474a209b66137'),
      message: `Đơn hàng mới số bàn: ${result.table_number} giá tiền ${result.total_price}`,
      type: NotificationType.OrderCreated,
      status: NotificationStatus.Unread
    })
  )
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
