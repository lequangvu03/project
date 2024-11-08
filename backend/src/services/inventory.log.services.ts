import { ObjectId } from 'mongodb'
import InventoryLog from '~/models/schemas/inventoryLogs.schema'
import databaseService from '~/services/database.services'

class InventoryLogService {
  async getAllInventoryLogs() {
    const inventoryLogs = await databaseService.inventoryLogs.find().toArray()
    const total = await databaseService.inventoryLogs.countDocuments()
    return { inventoryLogs, total }
  }

  async addInventoryLog(data: InventoryLog) {
    // 1. ghi nhập thông tin nhập kho (khi tạo 1 inventory mới)
    const newInventoryLog = await databaseService.inventoryLogs.insertOne({
      _id: new ObjectId(),
      ...data
    })
    return newInventoryLog
  }

  async updateInventoryLog() {}
  async deleteeInventoryLog(id: string) {
    const inventoryLog = await databaseService.inventoryLogs.deleteOne({ _id: new ObjectId(id) })
    return inventoryLog
  }
}
const inventoryLogService = new InventoryLogService()
export default inventoryLogService
