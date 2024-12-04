import { NextFunction, Request, Response } from 'express'
import dashboardService from '~/services/dashboard.services'

export async function getDashboardOverviewController(req: Request, res: Response, next: NextFunction) {
  const month = Number(req.query.month)
  const week = Number(req.query.week)
  const day = Number(req.query.day)
  const result = await dashboardService.getDashboardOverview({ month: +month, day: +day, week: +week })
  return res.status(200).json({ message: 'Get dashboard overview success', result: result })
}
