import { NextFunction, Request, Response } from 'express'
import notificationService from '~/services/notification.services'

export const getAllNotificationController = async (req: Request, res: Response, error: NextFunction) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const result = await notificationService.getNotifications({ limit, page })
  return res.status(200).json({ message: 'get notification success', result })
}
