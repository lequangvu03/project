import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import inventoryLogService from './inboundOrder.services'
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
  async checkIngredientNameExist(name: string, id?: string) {
    if (id) {
      const ingredient = await databaseService.ingredients.findOne({ _id: new ObjectId(id) })
      if (ingredient?.name == name) {
        return false
      }
    }
    const ingredient = await databaseService.ingredients.findOne({ name: name })
    return ingredient
  }
  async updateIngredient(id: string, data: ingredients) {
    const updatedingredient = await databaseService.ingredients.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data
        }
      },
      { returnDocument: 'after' }
    )
    return updatedingredient
  }
  async deleteIngredient(id: string) {
    const deletedingredient = await databaseService.ingredients.deleteOne({ _id: new ObjectId(id) })
    return deletedingredient
  }
}
const ingredientsService = new IngredientsService()
export default ingredientsService
