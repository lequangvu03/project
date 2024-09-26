import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'

class CategoryService {
  async checkCategoryExist(category_id: string) {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(category_id) })
    return category
  }

  async getAllCategories() {
    const categories = await databaseService.categories.find().toArray()
    const total = await databaseService.categories.countDocuments()
    return { categories, total }
  }

  async addCategory(name: string, description?: string) {
    const category = await databaseService.categories.insertOne({
      name,
      description,
      created_at: Date.now(),
      updated_at: Date.now()
    })
    return category
  }

  async updateCategory(id: string, name?: string, description?: string) {
    const category = await databaseService.categories.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          description,
          updated_at: Date.now()
        }
      }
    )
    return category
  }

  async deleteCategory(id: string) {
    const category = await databaseService.categories.deleteOne({ _id: new ObjectId(id) })
    return category
  }
}

const categoryService = new CategoryService()
export default categoryService
