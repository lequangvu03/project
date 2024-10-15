import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import tableService from './table.services'
import inventoryLogService from './inventory.log.services'

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
    perishable: boolean,
    importDate: Date
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
    const inventoryLogId = newInventoryItem.insertedId
    const category = await databaseService.categories.findOne({ _id: new ObjectId(category_id) })
    const changeType = `added cho hàng ${category?.name}}`
    const log = await inventoryLogService.addInventoryLog(inventoryLogId, changeType, quantity, importDate)

    return { newInventoryItem, log }
  }

  async updateInventoryItem(
    id: string,
    name: string,
    category_id: ObjectId,
    quantity: number,
    stock: string,
    unit_price: number,
    status: string,
    perishable: boolean,
    importDate: Date
  ) {
    // 1. update inventory item
    const updatedInventoryItem = await databaseService.inventoryItems.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name,
          category_id: category_id,
          quantity: quantity,
          stock: stock,
          unit_price: unit_price,
          status: status,
          perishable: perishable
        }
      }
    )
    // 2. update inventory log
    const category = await databaseService.categories.findOne({ _id: category_id })
    const updatedInventoryLog = await databaseService.inventoryLogs.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          change_type: `added cho hàng ${category?.name}}`,
          change_quantity: quantity,
          change_date: importDate
        }
      }
    )
    return { updatedInventoryItem, updatedInventoryLog }
  }
  async deleteInventoryItem(id: string) {
    const inventoryItem = await databaseService.inventoryItems.deleteOne({ _id: new ObjectId(id) })
    return inventoryItem
  }
}
const inventoryItemsService = new InventoryItemsService()
export default inventoryItemsService
