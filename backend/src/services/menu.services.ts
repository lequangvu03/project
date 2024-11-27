import fs from 'fs'
import { ObjectId } from 'mongodb'
import path from 'path'
import { ppid } from 'process'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import MenuItem from '~/models/schemas/menuItems.schema'
import databaseService from '~/services/database.services'
import cloudinary from '~/utils/cloudinary'
import { getNameFromFullname } from '~/utils/file'

class MenuService {
  async checkNameExists(name: string) {
    const menuItem = await databaseService.menuItems.findOne({ name })
    return menuItem
  }
  async getMenu() {
    const menus = await databaseService.menuItems
      .aggregate([
        {
          // Chuyển category_id thành ObjectId nếu cần
          $addFields: {
            category_id: { $toObjectId: '$category_id' }
          }
        },
        {
          $lookup: {
            from: 'categories', // Bảng categories
            localField: 'category_id', // Trường category_id trong menuItems
            foreignField: '_id', // Trường _id trong categories
            as: 'category' // Kết quả join lưu vào trường 'category'
          }
        },
        {
          $unwind: {
            path: '$category', // Giải nén kết quả trong trường 'category'
            preserveNullAndEmptyArrays: true // Giữ lại menu không có category
          }
        },
        {
          $addFields: {
            category_name: '$category.name' // Thêm trường 'categoryName' từ category
          }
        },
        {
          $project: {
            category: 0 // Loại bỏ trường 'category' để kết quả gọn hơn
          }
        }
      ])
      .toArray()

    const total = menus.length

    return { menus, total }
  }

  async getMenuByCategory(categoryId: string) {
    const menus = await databaseService.menuItems.find({ category_id: new ObjectId(categoryId) }).toArray()
    const total = menus.length
    return { menus, total }
  }
  async getMenuByTag(tag: number) {
    // Truy vấn với toán tử $in để tìm các menu có chứa tag trong mảng tag
    const menus = await databaseService.menuItems
      .find({
        tag: { $in: [tag] } // Tìm trong mảng `tag` có chứa giá trị `tag`
      })
      .toArray()

    const total = menus.length
    return { menus, total }
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
  async addMenuItem({ data, dir }: { data: MenuItem; dir?: string }) {
    if (typeof data.tag === 'string') {
      try {
        data.tag = JSON.parse(data.tag)
      } catch (error) {
        console.error('Error parsing tag:', error)
      }
    }
    if (typeof data.ingredients === 'string') {
      try {
        data.ingredients = JSON.parse(data.ingredients)
      } catch (error) {
        console.error('Error parsing ingredients:', error)
      }
    }
    if (dir) {
      data.image = dir
    }
    console.log('data', data)
    if (dir) {
      data.image = dir
    }
    console.log('data', data)
    data._id = new ObjectId()
    const newMenuItem = new MenuItem({
      ...data,
      category_id: new ObjectId(data.category_id),
    })

    await databaseService.menuItems.insertOne(newMenuItem)
    return newMenuItem
  }
  async updateMenuItem({ menuItemId, data, dir }: { menuItemId: string; data: MenuItem; dir: string }) {
    if (data.tag && typeof data.tag === 'string') {
      try {
        data.tag = JSON.parse(data.tag)
      } catch (error) {
        console.error('Error parsing tag:', error)
      }
    }
    if (data.ingredients && typeof data.ingredients === 'string') {
      try {
        data.ingredients = JSON.parse(data.ingredients)
      } catch (error) {
        console.error('Error parsing ingredients:', error)
      }
    }
    const updateData: any = {
      ...data,
      category_id: new ObjectId(data.category_id),
      updated_at: Date.now()
    }
    if (dir !== '') {
      const item = await databaseService.menuItems.findOne({ _id: new ObjectId(menuItemId) })
      const avatarUrl = item?.image
      if (avatarUrl) {
        const publicId = avatarUrl.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(publicId)
        }
      }
      updateData.image = dir
    }
    await databaseService.menuItems.updateOne({ _id: new ObjectId(menuItemId) }, { $set: updateData })
  }

  async deleteMenuItems(menuItemIds: string[]) {
    // Chuyển đổi tất cả các ID từ chuỗi sang ObjectId
    const objectIds = menuItemIds.map((id: string) => new ObjectId(id))

    // Lấy tất cả các mục trong cơ sở dữ liệu dựa trên các ObjectId
    const items = await databaseService.menuItems
      .find({
        _id: { $in: objectIds }
      })
      .toArray()

    // Duyệt qua từng item và xóa ảnh nếu có
    for (const item of items) {
      const avatarUrl = item?.image
      if (avatarUrl) {
        const publicId = avatarUrl.split('/').pop()?.split('.')[0]

        // Nếu có publicId, xóa ảnh khỏi Cloudinary
        if (publicId) {
          await cloudinary.uploader.destroy(publicId)
        }
      }

      // Xóa mục khỏi cơ sở dữ liệu
      await databaseService.menuItems.deleteOne({ _id: item._id })
    }

    return { message: 'Items deleted successfully' }
  }
}
const menuService = new MenuService()
export default menuService
