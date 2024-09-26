import { NextFunction, Request, Response } from 'express'
import { VARIANT_MESSAGES } from '~/constants/messages'
import variantService from '~/services/variant.services'

export const getAllVariantsController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await variantService.getAllVariants()
  return res.status(200).json({ message: VARIANT_MESSAGES.GET_ALL_VARIANTS_SUCCESS, result })
}

export const addVariantController = async (req: Request, res: Response, next: NextFunction) => {
  const { menu_item_id, name, count, option_name, price_adjustment } = req.body
  const result = await variantService.addVariant(menu_item_id, name, count, option_name, price_adjustment)
  return res.status(201).json({ message: VARIANT_MESSAGES.ADD_VARIANT_SUCCESS, result })
}

export const updateVariantController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, option_name, count, price_adjustment } = req.body
  const result = await variantService.updateVariant(req.params.id, name, option_name, count, price_adjustment)
  return res.status(200).json({ message: VARIANT_MESSAGES.UPDATE_VARIANT_SUCCESS, result })
}

export const deleteVariantController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await variantService.deleteVariant(req.params.id)
  return res.status(200).json({ message: VARIANT_MESSAGES.DELETE_VARIANT_SUCCESS, result })
}
