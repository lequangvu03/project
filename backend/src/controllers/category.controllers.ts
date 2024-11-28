import { NextFunction, Request, Response } from 'express'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import categoryService from '~/services/category.services'

export const getAllCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.query
  const result = await categoryService.getAllCategories(id as string)
  return res.status(200).json({ message: CATEGORY_MESSAGES.GET_ALL_CATEGORIES_SUCCESS, result })
}

export const addCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body
  const result = await categoryService.addCategory(name, description)
  return res.status(201).json({ message: CATEGORY_MESSAGES.ADD_CATEGORY_SUCCESS, result })
}

export const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body
  const result = await categoryService.updateCategory(req.params.id, name, description)
  return res.status(200).json({ message: CATEGORY_MESSAGES.UPDATE_CATEGORY_SUCCESS, result })
}

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await categoryService.deleteCategory(req.params.id)
  return res.status(200).json({ message: CATEGORY_MESSAGES.DELETE_CATEGORY_SUCCESS, result })
}
