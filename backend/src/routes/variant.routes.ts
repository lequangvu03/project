import { Router } from 'express'
import {
  addVariantController,
  deleteVariantController,
  getAllVariantsController,
  updateVariantController
} from '~/controllers/variant.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { addVariantValidator, deleteVariantValidator, updateVariantValidator } from '~/middlewares/variant.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const variantRouter = Router()

/**
 * path: api/variants/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all variants
 * response: {message: string, result: {variants: VariantType[], total: number}}
 * */
variantRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllVariantsController))

/**
 * path: api/variants/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {menu_item_id: string, name: string, count:number, option_name: string, price_adjustment: number}
 * description: Add a new variant
 * response: {message: string, result: VariantType}
 * */
variantRouter.post('/', accessTokenValidator, addVariantValidator, wrapRequestHandler(addVariantController))

/**
 * path: api/variants/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string, menu_item_id?: string, name?: string, option_name?: string, price_adjustment?: number}
 * description: Update a variant
 * response: {message: string, result: VariantType}
 * */
variantRouter.put('/:id', accessTokenValidator, updateVariantValidator, wrapRequestHandler(updateVariantController))

/**
 * path: api/variants/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string}
 * description: Delete a variant
 * response: {message: string, result: VariantType}
 * */
variantRouter.delete('/:id', accessTokenValidator, deleteVariantValidator, wrapRequestHandler(deleteVariantController))
