import { Router } from 'express'
import {
  addMenuItemController,
  deleteMenuItemController,
  getAllMenuController,
  updateMenuItemController
} from '~/controllers/menu.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { addMenuItemValidator, handleRequest } from '~/middlewares/menu.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const menuRouter = Router()

/**
 * path: api/menu/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all menu items
 * response: {message: string, result: {menuItems: MenuItemType[], total: number}}
 * */
menuRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllMenuController))

/**
 * path: api/menu/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, price: number, description: string,base_price: number, category: string, variant_ids: ObjectId[], image: string}
 * description: Add a new menu item
 * response: {message: string, result: MenuItemType}
 * */
menuRouter.post(
  '/',
  accessTokenValidator,
  handleRequest,
  addMenuItemValidator,
  wrapRequestHandler(addMenuItemController)
)

/**
 * path: api/menu/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string, name?: string, price?: number, description?: string, base_price?: number, category?: string, variant_ids?: ObjectId[], image?: string}
 * description: Update a menu item
 * response: {message: string, result: MenuItemType}
 * */
menuRouter.put('/:id', accessTokenValidator, handleRequest, wrapRequestHandler(updateMenuItemController))

/**
 * path: api/menu/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string}
 * description: Delete a menu item
 * response: {message: string, result: MenuItemType}
 * */
menuRouter.delete('/:id', accessTokenValidator, wrapRequestHandler(deleteMenuItemController))
