import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'

class CategoryService {
  async checkCategoryNameExist(categoryName: string, id?: string) {
    if (id) {
      const categories = await databaseService.categories.findOne({ _id: new ObjectId(id) })
      if (categories?.name == categoryName) {
        return false
      }
    }
    const category = await databaseService.categories.findOne({ name: categoryName })
    return category
  }
  async checkCategoryExist(categoryId: string) {
    const category = await databaseService.categories.findOne({ _id: new ObjectId(categoryId) })
    return category
  }

  async getAllCategories(id?: string) {
    const pipeline = []
    if (id) {
      try {
        pipeline.push({
          $match: {
            _id: new ObjectId(id) // Chuyển id sang ObjectId
          }
        })
      } catch (error) {
        throw new Error('Invalid ID format') // Báo lỗi nếu id không hợp lệ
      }
    }

    pipeline.push(
      {
        $lookup: {
          from: 'menu_items', // Bảng menu_items
          localField: '_id', // Trường _id trong categories
          foreignField: 'category_id', // Trường category_id trong menu_items
          as: 'products' // Lưu kết quả vào trường 'products'
        }
      },
      {
        $addFields: {
          products: {
            $filter: {
              input: '$products',
              as: 'product',
              cond: { $eq: ['$$product.category_id', '$_id'] }
            }
          }
        }
      },
      {
        $project: {
          _id: 1, // Chỉ lấy _id
          name: 1, // Chỉ lấy name
          totalProducts: { $size: '$products' } // Đếm số lượng sản phẩm trong trường 'products'
        }
      }
    )
    const categories = await databaseService.categories.aggregate(pipeline).toArray()

    // Tính tổng số lượng
    const total = id
      ? categories.length // Nếu có id, chỉ tính số kết quả tìm được
      : await databaseService.categories.countDocuments()

    return { categories, total }
  }
  // async getAllCategories(id?: string) {
  //   if (id) {
  //     const category = await databaseService.categories.findOne({ _id: new ObjectId(id) })
  //     return category
  //   }
  //   const categories = await databaseService.categories.find().toArray()
  //   const total = await databaseService.categories.countDocuments()
  //   return { categories, total }
  // }

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
