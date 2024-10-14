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
import { inventoryItemRouter } from './routes/inventoryItem.routes'
import { employeeRouter } from './routes/employee.routes'
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
app.use('/api/inventory_item', inventoryItemRouter)
app.use('/api/employee', employeeRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
