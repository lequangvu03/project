import { NextFunction, Request, Response } from 'express'
import notificationService from '~/services/notification.services'

export const getAllNotificationController = async (req: Request, res: Response, error: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const status = Number(req.query.status)
  const result = await notificationService.getNotifications({ limit, page, status })
  return res.status(200).json({ message: 'get notification success', result })
}
export const updateStatusReadNotificationController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await notificationService.updateReadNotifications(req.params.id.toString())
  return res.status(200).json({ message: 'get notification success', result })
}
export const updateAllStatusReadNotificationController = async (req: Request, res: Response, error: NextFunction) => {
  const { ids } = req.body
  const result = await notificationService.updateAllReadNotifications(ids)
  return res.status(200).json({ message: 'read all notification success', result })
}
