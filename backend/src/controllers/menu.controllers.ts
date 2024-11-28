import { NextFunction, Request, Response } from 'express'
import { CATEGORY_MESSAGES, MENU_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/media.services'
import menuService from '~/services/menu.services'
export const getAllMenuController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId, tag } = req.query
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)
    const sortBy = req.query.sortBy as string | undefined
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined
    const result = await menuService.getMenu({
      limit,
      page,
      sortBy,
      sortOrder,
      categoryId: categoryId as string,
      tag: tag ? +tag : undefined
    })

    return res.status(200).json({ message: MENU_MESSAGES.GET_ALL_MENU_ITEM_SUCCESS, result })
  } catch (error) {
    next(error)
  }
}

export const getMenuByCategoryController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await menuService.getMenu({ categoryId: req.params.id })
  return res.status(200).json({ message: MENU_MESSAGES.GET_ALL_MENU_ITEM_SUCCESS, result })
}
export const addMenuItemController = async (req: Request, res: Response, error: NextFunction) => {
  let dir
  if (req.files.image) {
    console.log('fds')
    dir = await mediaService.uploadImage(req.files.image[0])
  }
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
  await menuService.deleteMenuItems(req.params.id)
  return res.status(200).json({ message: MENU_MESSAGES.DELETE_MENU_ITEM_SUCCESS })
}
