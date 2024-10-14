import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'

class InventoryLogService {
  async getAllInventoryLogs() {
    const inventoryLogs = await databaseService.inventoryLogs.find().toArray()
    const total = await databaseService.inventoryLogs.countDocuments()
    return { inventoryLogs, total }
  }

  async addInventoryLog(
    itemId: ObjectId,
    quantity: number,
    changeType: string,
    changeQuantity: number,
    changeDate: Date
  ) {
    // 1. ghi nhập thông tin nhập kho (khi tạo 1 inventory mới)
    const newInventoryLog = await databaseService.inventoryLogs.insertOne({
      _id: new ObjectId(),
      item_id: itemId,
      change_type: changeType,
      change_quantity: changeQuantity,
      change_date: changeDate
    })
    return newInventoryLog
  }

  async updateInventoryLog() {}
  async deleteeInventoryLog(id: string) {
    const inventoryLog = await databaseService.inventoryLogs.deleteOne({ _id: new ObjectId(id) })
    return inventoryLog
  }
}
const inventoryItemsService = new InventoryLogService()
export default inventoryItemsService
