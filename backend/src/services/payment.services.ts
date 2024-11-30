import { ObjectId } from 'mongodb'
import { OrderStatus, PaymentStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'

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
        const ingredientQuantity = ingredient.quantity * quantity // Số lượng cần trừ = quantity của order_item * quantity ingredient
        await databaseService.ingredients.updateOne({ _id: ingredientId }, { $inc: { stock: -ingredientQuantity } })
      }
    }
    return Order
  }
}
const paymentService = new PaymentService()
export default paymentService
