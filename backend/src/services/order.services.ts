import Order from '~/models/schemas/orders.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class OrderService {
  async getAllOrders() {
    const orders = await databaseService.orders.find().toArray()
    const total = orders.length
    return { orders, total }
  }
  // trong request body, không thể truyền kiểu ObjectId
  // nên ta sẽ truyền customer_id và 1 mảng order items id
  // VD: customer_id: "6348acd2e1a47ca32e79f46f" => Đây là string ép về ObjectId
  // order_item_ids: ["6348acd2e1a47ca32e79f46f", "6348acd2e1a47ca32e79f46f"] Mảng string
  // Ví dụ về 1 request trong postman
  /**
   * {
    "customer_id": "6348acd2e1a47ca32e79f46f",
    "table_number": 1,
    "total_price": 100,
    "payment_status": "false", 
    "order_status": "false",
    "order_item_ids": ["6348acd2e1a47ca32e79f46f"]
    }
   */

  async addOrder(
    customer_id: string = '',
    table_number: number,
    order_item_ids: string[] = [],
    total_price: number,
    payment_status: string,
    order_status: string = 'false'
  ) {
    // xử lý đầu vào của customer_id và mảng id của orderItems
    const objectCustomerId = new ObjectId(customer_id)
    const orderItemIds = order_item_ids.map((item) => new ObjectId(item))
    // tạo order
    const order = await databaseService.orders.insertOne({
      customer_id: objectCustomerId,
      table_number,
      order_item_ids: orderItemIds,
      total_price,
      payment_status,
      order_status,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    return order
  }
}
const orderService = new OrderService()
export default orderService
