import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'

class CategoryService {
  async checkCategoryNameExist(categoryName: string) {
    const category = await databaseService.categories.findOne({ name: categoryName })
    return category
  }
  async checkCategoryExist(categoryId: string) {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(categoryId) })
    return category
  }

  async getAllCategories() {
    const categories = await databaseService.categories
      .aggregate([
        {
          $lookup: {
            from: 'menu_items',
            localField: '_id',
            foreignField: 'category_id',
            as: 'products'
          }
        },
        {
          $project: {
            _id: 1,
            name: 1,
            totalProducts: { $size: '$products' }
          }
        }
      ])
      .toArray()

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
