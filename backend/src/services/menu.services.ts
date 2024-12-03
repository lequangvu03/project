import fs from 'fs'
import { ObjectId } from 'mongodb'
import path from 'path'
import { ppid } from 'process'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { menuItemStatus } from '~/constants/enums'
import MenuItem from '~/models/schemas/menuItems.schema'
import databaseService from '~/services/database.services'
import cloudinary from '~/utils/cloudinary'
import { getNameFromFullname } from '~/utils/file'

class MenuService {
  async checkNameExists(name: string, id?: string) {
    if (id) {
      const categories = await databaseService.menuItems.findOne({ _id: new ObjectId(id) })
      if (categories?.name == name) {
        return false
      }
    }
    const menuItem = await databaseService.menuItems.findOne({ name, status: menuItemStatus.Available })
    return menuItem
  }
  // async getMenu() {
  //   const menus = await databaseService.menuItems
  //     .aggregate([
  //       {
  //         // Chuyển category_id thành ObjectId nếu cần
  //         $addFields: {
  //           category_id: { $toObjectId: '$category_id' }
  //         }
  //       },
  //       {
  //         $lookup: {
  //           from: 'categories', // Bảng categories
  //           localField: 'category_id', // Trường category_id trong menuItems
  //           foreignField: '_id', // Trường _id trong categories
  //           as: 'category' // Kết quả join lưu vào trường 'category'
  //         }
  //       },
  //       {
  //         $unwind: {
  //           path: '$category', // Giải nén kết quả trong trường 'category'
  //           preserveNullAndEmptyArrays: true // Giữ lại menu không có category
  //         }
  //       },
  //       {
  //         $addFields: {
  //           category_name: '$category.name' // Thêm trường 'categoryName' từ category
  //         }
  //       },
  //       {
  //         $project: {
  //           category: 0 // Loại bỏ trường 'category' để kết quả gọn hơn
  //         }
  //       }
  //     ])
  //     .toArray()

  //   const total = menus.length

  //   return { menus, total }
  // }
  async getMenu({
    limit,
    page,
    sortBy,
    sortOrder,
    categoryId,
    tag,
    name,
    id
  }: {
    limit?: number
    page?: number
    sortBy?: string
    sortOrder?: string
    categoryId?: string
    tag?: number
    name?: string
    id?: string
  }) {
    const matchFilter: any = {
      status: menuItemStatus.Available
    }
    const sortQuery: { [key: string]: 1 | -1 } = {
      [sortBy || 'created_at']: sortOrder === 'ascend' ? 1 : -1
    }

    // Nếu có categoryId, thêm điều kiện lọc cho category_id
    if (categoryId) {
      matchFilter.category_id = new ObjectId(categoryId)
    }
    // Nếu có name, thêm điều kiện lọc cho tên
    if (name) {
      matchFilter.name = { $regex: new RegExp(name, 'i') } // Tìm kiếm không phân biệt hoa thường
    }
    if (id) {
      matchFilter._id = new ObjectId(id)
    }

    // Nếu có tag, thêm điều kiện lọc cho tag
    if (tag !== undefined) {
      matchFilter.tag = { $in: [tag] } // Lọc tag nằm trong mảng tag
    }

    // Khởi tạo pipeline cơ bản
    const pipeline: any[] = [
      {
        // Chuyển category_id thành ObjectId nếu cần
        $addFields: {
          category_id: { $toObjectId: '$category_id' }
        }
      },
      {
        // Áp dụng bộ lọc nếu có
        $match: matchFilter
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
          category_name: '$category.name' // Thêm trường 'category_name' từ category
        }
      },
      {
        $project: {
          category: 0 // Loại bỏ trường 'category' để kết quả gọn hơn
        }
      }
    ]

    // Thêm các bước phân trang nếu có `limit` và `page`
    if (limit && page) {
      pipeline.push(
        { $sort: sortQuery }, // Thêm bước sắp xếp
        { $skip: limit * (page - 1) }, // Thêm bước bỏ qua
        { $limit: limit } // Thêm bước giới hạn số lượng
      )
    }

    // Thực thi pipeline
    const menus = await databaseService.menuItems.aggregate(pipeline).toArray()

    // Tính tổng số lượng (nếu cần)
    const total = await databaseService.menuItems.countDocuments(matchFilter)

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
    if (dir) {
      data.image = dir
    }
    data._id = new ObjectId()
    const ingredients = data.ingredients.map((ingredients) => ({
      ...ingredients,
      item_id: new ObjectId(ingredients._id)
    }))
    const newMenuItem = new MenuItem({
      ...data,
      ingredients: ingredients,
      category_id: new ObjectId(data.category_id),
      status: menuItemStatus.Available
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
  async updateAllMenuItem(data: any) {
    await databaseService.menuItems.updateMany({}, { $set: { ...data } })
    return { message: 'Items updated successfully' }
  }

  async deleteMenuItems(Ids: string) {
    // Chuyển đổi tất cả các ID từ chuỗi sang ObjectId
    // const id = new ObjectId(Ids)
    // // Lấy tất cả các mục trong cơ sở dữ liệu dựa trên các ObjectId
    // const item = await databaseService.menuItems.findOne({
    //   _id: id
    // })

    // // Duyệt qua từng item và xóa ảnh nếu có
    // const avatarUrl = item?.image
    // if (avatarUrl) {
    //   const publicId = avatarUrl.split('/').pop()?.split('.')[0]
    //   // Nếu có publicId, xóa ảnh khỏi Cloudinary
    //   if (publicId) {
    //     await cloudinary.uploader.destroy(publicId)
    //   }
    // }
    // await databaseService.menuItems.deleteOne({ _id: item?._id })
    await databaseService.menuItems.updateOne(
      { _id: new ObjectId(Ids) },
      { $set: { status: menuItemStatus.Unavailable } }
    )
    return { message: 'Items deleted successfully' }
  }
}
const menuService = new MenuService()
export default menuService
