import express from 'express'
import 'dotenv/config'
import { authRouter } from './routes/auth.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { envConfig } from './constants/config'
import cors from 'cors'
import { tableRouter } from '~/routes/table.routes'
import { menuRouter } from '~/routes/menu.routes'
import { ordersRouter } from './routes/orders.routes'
import { categoryRouter } from '~/routes/category.routes'
import { initFolder } from '~/utils/file'
import { bookingRouter } from './routes/bookings.routes'
import { ingredientRouter } from './routes/ingredient.routes'
import { notificationRouter } from '~/routes/notification.routes'
import { employeeRouter } from './routes/employee.routes'
import { userRouter } from '~/routes/user.routes'
import { dashboardRouter } from '~/routes/dashboard.routes'
import { inboundOrderRouter } from './routes/inboundOrder.routes'
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
})
initFolder()
const app = express()
app.use(cors())
const port = envConfig.port
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRouter)
app.use('/api/table', tableRouter)
app.use('/api/menu', menuRouter)
app.use('/api/order', ordersRouter)
app.use('/api/category', categoryRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/ingredient', ingredientRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/profile', userRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/inbound-order', inboundOrderRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
export default app
