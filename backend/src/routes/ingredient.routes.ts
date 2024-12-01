import { Router } from 'express'
import {
  addIngredientController,
  deleteIngredientController,
  getAllIngredientsController,
  getIngredientsController,
  updateIngredientController
} from '~/controllers/ingredient.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  addIngredientValidator,
  deleteIngredientValidator,
  updateIngredientValidator
} from '~/middlewares/ingredient.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

// 1. Thêm hàng mới vào kho
export const ingredientRouter = Router()

/**
 * path: api/inventory_item/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all inventory items
 * response: {message: string, result: {bookings: ingredientType[], total: number}}
 * */

ingredientRouter.get('/', accessTokenValidator, wrapRequestHandler(getIngredientsController))
ingredientRouter.get('/all', accessTokenValidator, wrapRequestHandler(getAllIngredientsController))
/**
 * path: api/inventory_item/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, category_id: ObjectId, quantity: number, stock: string, unit_price: price, status: string, perishable: boolean, importDate: Date}
 * description: Add a new inventory
 * response: {message: string, result: ingredientType}
 * */

ingredientRouter.post('/', addIngredientValidator, wrapRequestHandler(addIngredientController))

/**
 * path: api/inventory_item/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * params: id (inventory_item id)
 * body: {name: string, category_id: ObjectId, quantity: number, stock: string, unit_price: price, status: string, perishable: boolean, importDate: Date}
 * description: Update a table
 * response: {message: string, result: ingredientType}
 * */
ingredientRouter.put('/:id', updateIngredientValidator, wrapRequestHandler(updateIngredientController))

/**
 * path: api/inventory_item/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {table_number: number}
 * description: Delete a inventory item
 * response: {message: string, result: ingredientType}
 * */
ingredientRouter.delete('/:id', deleteIngredientValidator, wrapRequestHandler(deleteIngredientController))
