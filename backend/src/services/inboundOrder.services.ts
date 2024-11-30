import { ObjectId } from 'mongodb'
import InboundOrder from '~/models/schemas/inboundOrder.schema'
import databaseService from '~/services/database.services'

class InboundOrderService {
  async getAllInboundOrders() {
    const inboundOrders = await databaseService.inboundOrders.find().toArray()
    const total = await databaseService.inboundOrders.countDocuments()
    return { inboundOrders, total }
  }

  async addInboundOrders(data: InboundOrder) {
    // 1. ghi nhập thông tin nhập kho (khi tạo 1 inventory mới)
    console.log(data)

    const inboundOrders = await databaseService.inboundOrders.insertOne({
      _id: new ObjectId(),
      ...data
    })
    return inboundOrders
  }

  async updateInboundOrders(id: string, data: InboundOrder) {
    // 1. ghi nhập thông tin nhập kho (khi tạo 1 inventory mới)
    console.log(data)
    const updatedInboundOrder = await databaseService.inboundOrders.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          inbound_order_items: data.inbound_order_items,
          total_price: data.total_price
        }
      }
    )
    return updatedInboundOrder
  }
  async deleteInboundOrders(id: string) {
    const inboundOrders = await databaseService.inboundOrders.deleteOne({ _id: new ObjectId(id) })
    return inboundOrders
  }
}
const inboundOrderService = new InboundOrderService()
export default inboundOrderService
