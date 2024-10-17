import { Router } from 'express'
import {
  addInventoryItemController,
  deleteInventoryItemController,
  getAllInventoryItemsController,
  updateInventoryItemController
} from '~/controllers/inventoryItem.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  addInventoryItemValidator,
  deleteInventoryItemValidator,
  updateInventoryItemValidator
} from '~/middlewares/inventory.item.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

// 1. Thêm hàng mới vào kho
export const inventoryItemRouter = Router()

/**
 * path: api/inventory_item/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all inventory items
 * response: {message: string, result: {bookings: InventoryItemType[], total: number}}
 * */

inventoryItemRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllInventoryItemsController))

/**
 * path: api/inventory_item/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, category_id: ObjectId, quantity: number, stock: string, unit_price: price, status: string, perishable: boolean, importDate: Date}
 * description: Add a new inventory
 * response: {message: string, result: InventoryItemType}
 * */

inventoryItemRouter.post('/', addInventoryItemValidator, wrapRequestHandler(addInventoryItemController))

/**
 * path: api/inventory_item/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * params: id (inventory_item id)
 * body: {name: string, category_id: ObjectId, quantity: number, stock: string, unit_price: price, status: string, perishable: boolean, importDate: Date}
 * description: Update a table
 * response: {message: string, result: InventoryItemType}
 * */
inventoryItemRouter.put('/:id', updateInventoryItemValidator, wrapRequestHandler(updateInventoryItemController))

/**
 * path: api/inventory_item/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a inventory item
 * response: {message: string, result: InventoryItemType}
 * */
inventoryItemRouter.delete('/:id', deleteInventoryItemValidator, wrapRequestHandler(deleteInventoryItemController))
