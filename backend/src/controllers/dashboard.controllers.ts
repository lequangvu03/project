import { NextFunction, Request, Response } from 'express'
import dashboardService from '~/services/dashboard.services'

export async function getDashboardOverviewController(req: Request, res: Response, next: NextFunction) {
  const result = await dashboardService.getDashboardOverview()
  return res.status(200).json({ message: 'Get dashboard overview success', result: result })
}
