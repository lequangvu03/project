import { ObjectId } from 'mongodb'
import InventoryLog from '~/models/schemas/inboundOrder.schema'
import databaseService from '~/services/database.services'

class InboundOrderService {
  async getAllInventoryLogs() {
    const inboundOrders = await databaseService.inboundOrders.find().toArray()
    const total = await databaseService.inboundOrders.countDocuments()
    return { inboundOrders, total }
  }

  async addInboundOrders(data: InventoryLog) {
    // 1. ghi nhập thông tin nhập kho (khi tạo 1 inventory mới)
    const inboundOrders = await databaseService.inboundOrders.insertOne({
      _id: new ObjectId(),
      ...data
    })
    return inboundOrders
  }

  async updateInboundOrders() {}
  async deleteeInboundOrders(id: string) {
    const inboundOrders = await databaseService.inboundOrders.deleteOne({ _id: new ObjectId(id) })
    return inboundOrders
  }
}
const inboundOrderService = new InboundOrderService()
export default inboundOrderService
