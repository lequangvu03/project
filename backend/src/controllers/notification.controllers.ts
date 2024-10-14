import { NextFunction, Request, Response } from 'express'
import notificationService from '~/services/notification.services'

export const getAllNotificationController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await notificationService.getNotifications()
  return res.status(200).json({ message: 'get notification success', result })
}
