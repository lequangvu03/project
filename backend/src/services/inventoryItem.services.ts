import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import tableService from './table.services'

class InventoryItemsService {
  async getAllInventoryItems() {
    const inventoryItems = await databaseService.inventoryItems.find().toArray()
    const total = await databaseService.inventoryItems.countDocuments()
    return { inventoryItems, total }
  }

  async addInventoryItem(
    name: string,
    category_id: ObjectId,
    quantity: number,
    stock: string,
    unit_price: number,
    status: string,
    perishable: boolean
  ) {
    // 1. Nhập kho (tạo 1 inventory Item mới VD: gà)
    const newInventoryItem = await databaseService.inventoryItems.insertOne({
      _id: new ObjectId(),
      name: name,
      category_id: new ObjectId(category_id),
      quantity: quantity,
      stock: stock,
      unit_price: unit_price,
      status: status,
      perishable: perishable
    })
    // 2. Ghi nhận log nhập kho
    return newInventoryItem
  }

  async updateInventoryItem() {}
  async deleteInventoryItem(id: string) {
    const inventoryItem = await databaseService.inventoryItems.deleteOne({ _id: new ObjectId(id) })
    return inventoryItem
  }
}
const inventoryItemsService = new InventoryItemsService()
export default inventoryItemsService
