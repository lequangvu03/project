import path from 'path'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import databaseService from '~/services/database.services'
import sharp from 'sharp'
import { Request } from 'express'
import { getNameFromFullname, processFields } from '~/utils/file'
import MenuItem from '~/models/schemas/menuItems.schema'
import { ObjectId } from 'mongodb'

class MenuService {
  async getMenu() {
    return await databaseService.menuItems.find().toArray()
  }
  async uploadImage(file: any) {
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
    await sharp(file.filepath).jpeg().toFile(newPath)
    // try {
    //   fs.unlinkSync(file.filepath);
    // } catch (error) {
    //   console.log('err', error)
    // }
    return `${newName}.jpg`
  }
  async getMenuItemById(menuItemId: string) {
    return await databaseService.menuItems.findOne({ _id: new ObjectId(menuItemId) })
  }
  async addMenuItem({ data, dir }: { data: MenuItem; dir: string }) {
    data.image = dir
    const newMenuItem = new MenuItem({
      name: data.name,
      description: data.description,
      base_price: +data.base_price,
      image: data.image,
      category_id: data.category_id,
      variant_ids: data.variant_ids,
      count: +data.count
    })
    await databaseService.menuItems.insertOne(newMenuItem)
    return newMenuItem
  }
  async updateMenuItem({ menuItemId, data, dir }: { menuItemId: string; data: MenuItem; dir: string }) {
    if (dir == '') {
      await databaseService.menuItems.updateOne(
        { _id: new ObjectId(menuItemId) },
        {
          $set: {
            name: data.name,
            description: data.description,
            base_price: +data.base_price,
            category_id: new ObjectId(data.category_id),
            variant_ids: data.variant_ids,
            updated_at: Date.now()
          }
        }
      )
    } else {
      await databaseService.menuItems.updateOne(
        { _id: new ObjectId(menuItemId) },
        {
          $set: {
            name: data.name,
            description: data.description,
            base_price: +data.base_price,
            category_id: new ObjectId(data.category_id),
            variant_ids: data.variant_ids,
            image: dir,
            updated_at: Date.now()
          }
        }
      )
    }
  }
  async deleteMenuItem(menuItemId: string) {
    await databaseService.menuItems.deleteOne({ _id: new ObjectId(menuItemId) })
  }
}
const menuService = new MenuService()
export default menuService
