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
    const inboundOrders = await databaseService.inboundOrders.insertOne({
      _id: new ObjectId(),
      ...data,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    return inboundOrders
  }

  async updateInboundOrders(id: string, data: InboundOrder) {
    const updatedInboundOrder = await databaseService.inboundOrders.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          inbound_order_items: data.inbound_order_items,
          total_price: data.total_price,
          updated_at: Date.now()
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
