import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'

class VariantService {
  async checkVariantExist(variant_id: string) {
    const variant = await databaseService.variants.findOne({ _id: new ObjectId(variant_id) })
    return variant
  }
  async getAllVariants() {
    const variants = await databaseService.variants.find().toArray()
    const total = await databaseService.variants.countDocuments()
    return { variants, total }
  }

  async addVariant(menu_item_id: string, name: string, count: number, option_name: string, price_adjustment: number) {
    const variant = await databaseService.variants.insertOne({
      menu_item_id: new ObjectId(menu_item_id),
      name,
      option_name,
      price_adjustment,
      count
    })
    return variant
  }

  async updateVariant(id: string, name?: string, option_name?: string, count?: number, price_adjustment?: number) {
    const variant = await databaseService.variants.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          option_name,
          count,
          price_adjustment,
          updated_at: Date.now()
        }
      }
    )
    return variant
  }

  async deleteVariant(id: string) {
    const variant = await databaseService.variants.deleteOne({ _id: new ObjectId(id) })
    return variant
  }
}

const variantService = new VariantService()
export default variantService
