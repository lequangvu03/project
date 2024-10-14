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
    // 1. Nhập kho (tạo 1 inventory Item mới VD: gá)
    const itemId = new ObjectId()
    const newInventoryItem = await databaseService.inventoryItems.insertOne({
      _id: itemId,
      item_id: itemId,
      name: name,
      category_id: category_id,
      quantity: quantity,
      stock: stock,
      unit_price: unit_price,
      status: status,
      perishable: perishable
    })

    return newInventoryItem
  }
  async updateBooking(id: string, seatNumber: number) {
    const table = await databaseService.tables.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          seat_number: seatNumber,
          updated_at: Date.now()
        }
      }
    )
    return table
  }
  async deleteBooking(id: string) {
    const table = await databaseService.tables.deleteOne({ _id: new ObjectId(id) })
    return table
  }
}
const inventoryItemsService = new InventoryItemsService()
export default inventoryItemsService
