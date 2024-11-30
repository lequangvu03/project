import { Router } from 'express'
import { paymenntController } from '~/controllers/payment.controllers'
import { accessTokenValidator } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const paymenntRouter = Router()
paymenntRouter.post('/:id', accessTokenValidator, wrapRequestHandler(paymenntController))
