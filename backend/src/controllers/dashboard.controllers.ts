import { NextFunction, Request, Response } from 'express'

export function getDashboardOverviewController(req: Request, res: Response, next: NextFunction) {
  return res.status(200).json({ message: 'Get dashboard overview success', result: {} })
}
