import { NextFunction, Request, Response } from 'express'
import { BOOKING_MESSAGE, INVENTORY_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import bookingService from '~/services/booking.services'
import ingredientsService from '~/services/ingredient.services'

// get oke
export const getIngredientsController = async (req: Request, res: Response, error: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const sortBy = req.query.sortBy as string | undefined
  const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined
  const id = req.query.id as string
  const result = await ingredientsService.getIngredients({ limit, page, sortBy, sortOrder, id })
  return res.status(200).json({ message: INVENTORY_MESSAGE.GET_ALL_INVENTORY_SUCCESS, result })
}
export const getAllIngredientsController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await ingredientsService.getAllIngredients()
  return res.status(200).json({ message: INVENTORY_MESSAGE.GET_ALL_INVENTORY_SUCCESS, result })
}
// add oke
export const addIngredientController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await ingredientsService.addIngredient(req.body)
  return res.status(201).json({ message: INVENTORY_MESSAGE.ADD_NEW_INVENTORY_SUCCESS, result })
}
export const updateIngredientController = async (req: Request, res: Response, error: NextFunction) => {
  const id = req.params.id
  const result = await ingredientsService.updateIngredient(id, req.body)
  return res.status(200).json({ message: INVENTORY_MESSAGE.UPDATE_INVENTORY_SUCCESS, result })
}
export const deleteIngredientController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await ingredientsService.deleteIngredient(req.params.id)
  return res.status(200).json({ message: INVENTORY_MESSAGE.DELETE_INVENTORY_SUCCESS, result })
}
