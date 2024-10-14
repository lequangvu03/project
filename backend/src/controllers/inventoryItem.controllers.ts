import { NextFunction, Request, Response } from 'express'
import { BOOKING_MESSAGE, INVENTORY_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import bookingService from '~/services/booking.services'
import inventoryItemsService from '~/services/inventoryItem.services'

export const getAllInventoryItemsController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inventoryItemsService.getAllInventoryItems()
  return res.status(200).json({ message: INVENTORY_MESSAGE.GET_ALL_INVENTORY_SUCCESS, result })
}

export const addInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const { name, category_id, quantity, stock, unit_price, status, perishable } = req.body
  const result = await inventoryItemsService.addInventoryItem(
    name,
    category_id,
    quantity,
    stock,
    unit_price,
    status,
    perishable
  )
  return res.status(201).json({ message: INVENTORY_MESSAGE.ADD_NEW_INVENTORY_SUCCESS, result })
}
export const updateInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await bookingService.updateBooking(req.params.id, req.body.seat_number)
  return res.status(200).json({ message: BOOKING_MESSAGE.UPDATE_BOOKING_SUCCESS, result })
}
export const deleteInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await bookingService.deleteBooking(req.params.id)
  return res.status(200).json({ message: BOOKING_MESSAGE.DELETE_BOOKING_SUCCESS, result })
}
