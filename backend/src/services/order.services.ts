import Order from '~/models/schemas/orders.schema'
import OrderItem from '~/models/schemas/orderItems.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class OrderService {
  async getAllOrders() {
    const orders = await databaseService.orders.find().toArray()
    const total = orders.length
    return { orders, total }
  }

  // Thêm đơn hàng mới
  async addOrder(
    table_number: number,
    order_items: Array<{ item_id: string; quantity: number; price_per_item: number }>,
    total_price: number,
    payment_status: string,
    order_status: string = 'false'
  ) {
    // Xử lý order_items để chuyển item_id sang ObjectId và tạo các OrderItem mới
    const orderItems = order_items.map((item) => {
      return new OrderItem({
        item_id: new ObjectId(item.item_id),
        quantity: item.quantity,
        price_per_item: item.price_per_item
      })
    })

    // Tạo đơn hàng mới với order_items
    const newOrder = new Order({
      table_number,
      order_item_ids: orderItems.map((item) => item._id as ObjectId),
      total_price,
      payment_status,
      order_status,
      order_time: new Date(),
      created_at: Date.now(),
      updated_at: Date.now()
    })

    // Lưu các order_items vào database
    if (orderItems.length > 0) {
      await databaseService.orderItems.insertMany(orderItems)
    }

    // Lưu đơn hàng vào database
    await databaseService.orders.insertOne(newOrder)
    return newOrder
  }

  // Cập nhật đơn hàng
  async updateOrder(
    orderId: string,
    order_data: {
      table_number?: number
      order_items?: Array<{ item_id: string; quantity: number; price_per_item: number }>
      total_price?: number
      payment_status?: string
      order_status?: string
    }
  ) {
    const objectOrderId = new ObjectId(orderId)

    // Nếu có danh sách order_items trong request body thì xử lý cập nhật chúng
    let orderItemIds: ObjectId[] = []
    if (order_data.order_items) {
      const orderItems = order_data.order_items.map((item) => {
        return new OrderItem({
          item_id: new ObjectId(item.item_id),
          quantity: item.quantity,
          price_per_item: item.price_per_item
        })
      })

      // Cập nhật order items trong database
      if (orderItems.length > 0) {
        await databaseService.orderItems.insertMany(orderItems)
        orderItemIds = orderItems.map((item: any) => item._id as ObjectId)
      }
    }

    // Tạo đối tượng updateData, chỉ lấy những trường có giá trị hợp lệ
    const updateData: any = {
      updated_at: Date.now(),
      ...Object.fromEntries(Object.entries(order_data).filter(([key, value]) => value !== undefined))
    }

    // Nếu có orderItemIds, thêm vào updateData
    if (orderItemIds.length > 0) {
      updateData.order_item_ids = orderItemIds
    }

    // Cập nhật order
    await databaseService.orders.updateOne({ _id: objectOrderId }, { $set: updateData })

    return await databaseService.orders.findOne({ _id: objectOrderId })
  }

  // Xóa đơn hàng
  async deleteOrder(orderId: string) {
    const objectOrderId = new ObjectId(orderId)

    // Xóa order items liên quan trước khi xóa order
    const order = await databaseService.orders.findOne({ _id: objectOrderId })
    if (order && order.order_item_ids.length > 0) {
      await databaseService.orderItems.deleteMany({ _id: { $in: order.order_item_ids } })
    }

    // Xóa order
    await databaseService.orders.deleteOne({ _id: objectOrderId })

    return { message: 'Order deleted successfully' }
  }
}

const orderService = new OrderService()
export default orderService
