import { NextFunction, Request, Response } from 'express'
import { BOOKING_MESSAGE, INVENTORY_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import bookingService from '~/services/booking.services'
import inventoryItemsService from '~/services/inventoryItem.services'

// get oke
export const getAllInventoryItemsController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inventoryItemsService.getAllInventoryItems()
  return res.status(200).json({ message: INVENTORY_MESSAGE.GET_ALL_INVENTORY_SUCCESS, result })
}

// add oke
export const addInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const { name, category_id, quantity, stock, unit_price, status, perishable, import_date } = req.body
  const { newInventoryItem, log } = await inventoryItemsService.addInventoryItem(
    name,
    category_id,
    quantity,
    stock,
    unit_price,
    status,
    perishable,
    import_date
  )
  return res.status(201).json({ message: INVENTORY_MESSAGE.ADD_NEW_INVENTORY_SUCCESS, newInventoryItem, log })
}
export const updateInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id
  const { name, category_id, quantity, stock, unit_price, status, perishable, import_date } = req.body
  const { updatedInventoryItem, updatedInventoryLog } = await inventoryItemsService.updateInventoryItem(
    id,
    name,
    category_id,
    quantity,
    stock,
    unit_price,
    status,
    perishable,
    import_date
  )
  return res
    .status(200)
    .json({ message: INVENTORY_MESSAGE.UPDATE_INVENTORY_SUCCESS, updatedInventoryItem, updatedInventoryLog })
}
export const deleteInventoryItemController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await inventoryItemsService.deleteInventoryItem(req.params.id)
  return res.status(200).json({ message: INVENTORY_MESSAGE.DELETE_INVENTORY_SUCCESS, result })
}
