import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import inventoryLogService from './inboundOrder.services'
import ingredients from '~/models/schemas/ingredients.schema'
import { ChangeType } from '~/constants/enums'

class IngredientsService {
  async getIngredients({
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
    const ingredients = await databaseService.ingredients
      .find(matchFilter)
      .sort(sortQuery)
      .skip(limit * (page - 1)) // Sử dụng giá trị đã kiểm tra
      .limit(limit) // Sử dụng giá trị đã kiểm tra
      .toArray()
    const total = await databaseService.ingredients.countDocuments(matchFilter)
    return { ingredients, total }
  }
  async getAllIngredients(){
    const ingredients = await databaseService.ingredients.find().toArray()
    return ingredients
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
