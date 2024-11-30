import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { BOOKING_MESSAGE, INBOUND_ORDER_MESSAGE } from '~/constants/messages'
import { InboundOrderItemType } from '~/models/schemas/inboundOrder.schema'
import bookingService from '~/services/booking.services'
import inboundOrderService from '~/services/inboundOrder.services'
import { constructInboundOrdersArray } from '~/utils/helper'
// Phiếu nhập
export const getAllInboundOrderController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inboundOrderService.getAllInboundOrders()
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.GET_ALL_INBOUND_ITEMS_SUCCESS, result })
}
// inbound_order_items: Mảng các InboundOrderItemType (item_id , quantity)
// cần truyền mảng InboundOrderItemType: [ {item_id, quantity...} ]
/**
 {
    "total_price": 120000, 
    "inbound_order_items": [{"quantity": 10, "item_id": "674a77d3b35b6c1cf234433d"}, {"quantity": 20, "item_id": "674a77d3b35b6c1cf234433d"}]
}
 */

export const addInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const { inbound_order_items, total_price } = req.body
  // xử lý mảng inbound order
  const inbound_order_items_array = constructInboundOrdersArray(inbound_order_items)
  console.log(inbound_order_items_array)
  // tạo inbound order mới
  const newInboundOrder = await inboundOrderService.addInboundOrders({
    inbound_order_items: inbound_order_items_array,
    total_price
  })
  return res.status(201).json({ message: INBOUND_ORDER_MESSAGE.ADD_INBOUND_ITEM_SUCCESS, newInboundOrder })
}
// req.params (id), req.body(customer_name, customer_phone, table_number, booking_time, details)
export const updateInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  return res.status(200).json({ message: BOOKING_MESSAGE.UPDATE_BOOKING_SUCCESS })
}
export const deleteInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  return res.status(200).json({ message: BOOKING_MESSAGE.DELETE_BOOKING_SUCCESS })
}
