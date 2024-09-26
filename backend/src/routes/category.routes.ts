import { Router } from 'express'
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController
} from '~/controllers/category.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import {
  addCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator
} from '~/middlewares/category.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const categoryRouter = Router()

/**
 * path: api/categories/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all categories
 * response: {message: string, result: {categories: CategoryType[], total: number}}
 * */
categoryRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllCategoriesController))

/**
 * path: api/categories/
 * method: POST
 * header: {Authorization: Bearer <access_token>}
 * body: {name: string, description?: string}
 * description: Add a new category
 * response: {message: string, result: CategoryType}
 * */
categoryRouter.post('/', accessTokenValidator, addCategoryValidator, wrapRequestHandler(addCategoryController))

/**
 * path: api/categories/
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string, name?: string, description?: string}
 * description: Update a category
 * response: {message: string, result: CategoryType}
 * */
categoryRouter.put('/', accessTokenValidator, updateCategoryValidator, wrapRequestHandler(updateCategoryController))

/**
 * path: api/categories/
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * body: {id: string}
 * description: Delete a category
 * response: {message: string, result: CategoryType}
 * */
categoryRouter.delete('/', accessTokenValidator, deleteCategoryValidator, wrapRequestHandler(deleteCategoryController))
