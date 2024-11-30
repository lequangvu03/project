import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { BOOKING_MESSAGE, INBOUND_ORDER_MESSAGE } from '~/constants/messages'
import inboundOrderService from '~/services/inboundOrder.services'
import { constructInboundOrdersArray } from '~/utils/helper'
// Phiếu nhập
export const getAllInboundOrderController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inboundOrderService.getAllInboundOrders()
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.GET_ALL_INBOUND_ITEMS_SUCCESS, result })
}
export const addInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const { inbound_order_items, total_price } = req.body
  // xử lý mảng inbound order
  const inbound_order_items_array = constructInboundOrdersArray(inbound_order_items)
  // tạo inbound order mới
  const result = await inboundOrderService.addInboundOrders({
    inbound_order_items: inbound_order_items_array,
    total_price
  })
  return res.status(201).json({ message: INBOUND_ORDER_MESSAGE.ADD_INBOUND_ORDERS_SUCCESS, result })
}
export const updateInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const { inbound_order_items, total_price } = req.body
  const id = new ObjectId(req.params.id)
  // xử lý mảng inbound order
  const inbound_order_items_array = constructInboundOrdersArray(inbound_order_items)
  // update inbound order theo id
  const result = await inboundOrderService.updateInboundOrders(id, {
    inbound_order_items: inbound_order_items_array,
    total_price: total_price
  })
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.UPDATE_INBOUND_ORDER_SUCCESS, result })
}
export const deleteInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  return res.status(200).json({ message: BOOKING_MESSAGE.DELETE_BOOKING_SUCCESS })
}
