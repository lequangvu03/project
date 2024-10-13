import fs from 'fs'
import { ObjectId } from 'mongodb'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import MenuItem from '~/models/schemas/menuItems.schema'
import databaseService from '~/services/database.services'
import { getNameFromFullname } from '~/utils/file'

class MenuService {
  async checkNameExists(name: string) {
    const menuItem = await databaseService.menuItems.findOne({ name })
    return menuItem
  }
  async getMenu() {
    return await databaseService.menuItems.find().toArray()
  }
  async uploadImage(file: any) {
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
    await sharp(file.filepath).jpeg().toFile(newPath)
    try {
      fs.unlinkSync(file.filepath)
    } catch (error) {
      console.log('err', error)
    }
    return `${newName}.jpg`
  }
  async getMenuItemById(menuItemId: string) {
    return await databaseService.menuItems.findOne({ _id: new ObjectId(menuItemId) })
  }
  async addMenuItem({ data, dir }: { data: MenuItem; dir: string }) {
    data.image = dir
    const newMenuItem = new MenuItem({
      _id: new ObjectId(),
      name: data.name,
      description: data.description,
      price: +data.price,
      image: data.image,
      category_id: new ObjectId(data.category_id),
      availability: data.availability,
      stock: data.stock
    })
    await databaseService.menuItems.insertOne(newMenuItem)
    return newMenuItem
  }
  async updateMenuItem({ menuItemId, data, dir }: { menuItemId: string; data: MenuItem; dir: string }) {
    const updateData: any = {
      name: data.name,
      description: data.description,
      price: +data.price,
      category_id: new ObjectId(data.category_id),
      updated_at: Date.now()
    }

    // Nếu có đường dẫn ảnh mới, thêm vào đối tượng cập nhật
    if (dir !== '') {
      updateData.image = dir
    }

    // Thực hiện cập nhật trong cơ sở dữ liệu
    await databaseService.menuItems.updateOne({ _id: new ObjectId(menuItemId) }, { $set: updateData })
  }

  async deleteMenuItem(menuItemId: string) {
    await databaseService.menuItems.deleteOne({ _id: new ObjectId(menuItemId) })
  }
}
const menuService = new MenuService()
export default menuService
