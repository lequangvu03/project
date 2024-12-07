import { ObjectId } from 'mongodb'
import {
  notificationRoleType,
  NotificationStatus,
  NotificationType,
  OrderStatus,
  PaymentStatus,
  TableStatus
} from '~/constants/enums'
import Notification from '~/models/schemas/notifications.schema'
import databaseService from '~/services/database.services'
import { io } from '~/utils/socket'

class PaymentService {
  async paymentOrder(id: string) {
    const Order = await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { order_status: OrderStatus.Completed, payment_status: PaymentStatus.Paid } },
      { returnDocument: 'after' }
    )
    const order = await databaseService.orders.findOne({
      _id: new ObjectId(id)
    })
    if (Order && Order.table_number) {
      await databaseService.tables.updateOne(
        {
          table_number: Order.table_number
        },
        {
          $set: {
            status: TableStatus.Empty
          }
        }
      )
    }
    const orderItems = order ? order.order_items || [] : []
    for (const item of orderItems) {
      const menuItemId = new ObjectId(item.item_id)
      const menu_item = await databaseService.menuItems.findOne({ _id: menuItemId })

      const quantity = item.quantity

      // Cộng quantity_sold vào menu_item
      await databaseService.menuItems.updateOne({ _id: menuItemId }, { $inc: { quantity_sold: quantity } })
      // Xử lý nguyên liệu
      const ingredients = menu_item?.ingredients || []
      for (const ingredient of ingredients) {
        const ingredientId = new ObjectId(ingredient._id)
        const ingredientQuantity = ingredient.quantity * quantity
        const updatedIngredient = await databaseService.ingredients.findOneAndUpdate(
          { _id: ingredientId },
          { $inc: { stock: -ingredientQuantity } },
          { returnDocument: 'after' }
        )
        if (updatedIngredient && updatedIngredient.stock <= 50) {
          const notification = new Notification({
            _id: new ObjectId(),
            recipient: notificationRoleType.All,
            message: `Nguyên liệu ${updatedIngredient.name} gần hết! Số lượng còn lại: ${updatedIngredient.stock}`,
            title: 'Nguyên liệu sắp hết',
            status: NotificationStatus.Unread
          })
          // Lưu thông báo vào cơ sở dữ liệu (nếu cần)
          await databaseService.notifications.insertOne(notification)
          // Gửi thông báo qua Socket.IO
          io.emit('new_noti', { notification })
        }
      }
    }
    return Order
  }
}
const paymentService = new PaymentService()
export default paymentService
