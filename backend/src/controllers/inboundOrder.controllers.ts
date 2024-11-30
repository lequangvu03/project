import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { INBOUND_ORDER_MESSAGE } from '~/constants/messages'
import inboundOrderService from '~/services/inboundOrder.services'
// Phiếu nhập
export const getAllInboundOrderController = async (req: Request, res: Response, error: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sortBy = req.query.sortBy as string | undefined
  const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined
  const id = req.query.id as string
  const result = await inboundOrderService.getAllInboundOrders({ limit, page, sortBy, sortOrder, id })
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.GET_ALL_INBOUND_ITEMS_SUCCESS, result })
}
export const addInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inboundOrderService.addInboundOrders(req.body)
  return res.status(201).json({ message: INBOUND_ORDER_MESSAGE.ADD_INBOUND_ORDERS_SUCCESS, result })
}
export const updateInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id.toString()
  const result = await inboundOrderService.updateInboundOrders(id, req.body)
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.UPDATE_INBOUND_ORDER_SUCCESS, result })
}
export const deleteInboundOrdersController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id.toString()
  const result = await inboundOrderService.deleteInboundOrders(id)
  return res.status(200).json({ message: INBOUND_ORDER_MESSAGE.DELETE_INBOUND_ORDER_SUCCESS, result })
}
