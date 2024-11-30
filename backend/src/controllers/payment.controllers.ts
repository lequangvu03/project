import { NextFunction, Request, Response } from 'express'
import { ORDER_MESSAGE } from '~/constants/messages'
import paymentService from '~/services/payment.services'

export const paymenntController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await paymentService.paymentOrder(req.params.id)
  return res.status(201).json({ message: ORDER_MESSAGE.PAYMENT_SUCCESS, result })
}
