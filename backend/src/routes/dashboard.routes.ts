import { Router } from 'express'
import { getDashboardOverviewController } from '~/controllers/dashboard.controllers'
import { wrapRequestHandler } from '~/utils/handlers'

export const dashboardRouter = Router()

dashboardRouter.use('/overview', wrapRequestHandler(getDashboardOverviewController))
