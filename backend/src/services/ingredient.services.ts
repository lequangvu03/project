import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import inventoryLogService from './inventory.log.services'
import ingredients from '~/models/schemas/ingredients.schema'
import { ChangeType } from '~/constants/enums'

class IngredientsService {
  async getAllIngredients(id?: string) {
    if (id) {
      const ingredient = await databaseService.ingredients.findOne({ _id: new ObjectId(id) })
      return ingredient
    }
    const ingredients = await databaseService.ingredients.find().toArray()
    const total = await databaseService.ingredients.countDocuments()
    return { ingredients, total }
  }

  async addIngredient(data: ingredients) {
    data._id = new ObjectId()
    const newingredient = await databaseService.ingredients.insertOne(
      new ingredients({
        ...data
      })
    )
    return newingredient
  }

  async updateIngredient(id: string, data: ingredients) {
    const updatedingredient = await databaseService.ingredients.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data
        }
      }
    )
    return updatedingredient
  }
  async deleteIngredient(id: string) {
    const deletedingredient = await databaseService.ingredients.deleteOne({ _id: new ObjectId(id) })
    const deletedInventoryLog = await databaseService.inventoryLogs.deleteOne({ item_id: new ObjectId(id) })
    return { deletedingredient, deletedInventoryLog }
  }
}
const ingredientsService = new IngredientsService()
export default ingredientsService
