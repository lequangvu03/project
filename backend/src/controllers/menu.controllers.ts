import { NextFunction, Request, Response } from 'express'
import { MENU_MESSAGES } from '~/constants/messages'
import menuService from '~/services/menu.services'
export const getAllMenuController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await menuService.getMenu()
  return res.status(200).json({ message: MENU_MESSAGES.GET_ALL_MENU_ITEM_SUCCESS, result })
}
export const addMenuItemController = async (req: Request, res: Response, error: NextFunction) => {
  const dir = await menuService.uploadImage(req.files.image[0])
  const result = await menuService.addMenuItem({ data: req.body, dir: dir })
  return res.status(201).json({ message: MENU_MESSAGES.ADD_MENU_ITEM_SUCCESS, result })
}
export const updateMenuItemController = async (req: Request, res: Response, error: NextFunction) => {
  let dir = ''
  if (Object.keys(req.files).length > 0) {
    dir = await menuService.uploadImage(req.files.image[0])
  }
  const result = await menuService.updateMenuItem({ menuItemId: req.params.id, data: req.body, dir: dir })
  return res.status(200).json({ message: MENU_MESSAGES.UPDATE_MENU_ITEM_SUCCESS, result })
}
export const deleteMenuItemController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await menuService.deleteMenuItem(req.params.id)
  return res.status(200).json({ message: MENU_MESSAGES.DELETE_MENU_ITEM_SUCCESS, result })
}
