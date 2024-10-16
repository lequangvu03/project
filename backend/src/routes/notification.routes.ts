import { Router } from 'express'
import { getAllNotificationController } from '~/controllers/notification.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const notificationRouter = Router()

/**
 * path: api/notification/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all notifications
 *  parameters: {page: number, limit: number}
 **/

notificationRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllNotificationController))
