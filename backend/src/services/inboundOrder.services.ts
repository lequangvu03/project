import { ObjectId } from 'mongodb'
import InboundOrder from '~/models/schemas/inboundOrder.schema'
import databaseService from '~/services/database.services'

class InboundOrderService {
  async getAllInboundOrders({
    limit,
    page,
    sortBy,
    sortOrder,
    id
  }: {
    limit: number
    page: number
    sortBy?: string
    sortOrder?: string
    id?: string
  }) {
    const matchFilter: any = {}
    // Gán giá trị mặc định nếu `limit` hoặc `page` không được truyền
    limit = limit && Number.isInteger(limit) ? limit : 10 // Mặc định là 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Mặc định là 1

    const sortQuery: { [key: string]: 1 | -1 } = {
      [sortBy || 'created_at']: sortOrder === 'ascend' ? 1 : -1
    }
    if (id) {
      matchFilter._id = new ObjectId(id)
    }
    const inboundOrders = await databaseService.inboundOrders
      .find(matchFilter)
      .sort(sortQuery)
      .skip(limit * (page - 1)) // Sử dụng giá trị đã kiểm tra
      .limit(limit) // Sử dụng giá trị đã kiểm tra
      .toArray()
    const total = await databaseService.inboundOrders.countDocuments(matchFilter)
    return { inboundOrders, total }
  }

  async addInboundOrders(data: InboundOrder) {
    const inboundOrders = await databaseService.inboundOrders.insertOne(
      new InboundOrder({
        _id: new ObjectId(),
        ...data
      })
    )
    return inboundOrders
  }

  async updateInboundOrders(id: string, data: InboundOrder) {
    const updatedInboundOrder = await databaseService.inboundOrders.findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...data,
          updated_at: Date.now()
        }
      },
      { returnDocument: 'after' }
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
