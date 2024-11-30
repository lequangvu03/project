import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import User from '~/models/schemas/user.schema'
import databaseService from '~/services/database.services'
import cloudinary from '~/utils/cloudinary'

class UserService {
  async checkExistUserById(id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
    return user
  }
  async getAllProfile() {
    const users = await databaseService.users.find().toArray()
    const total = users.length
    return { users, total }
  }
  async getProfileById(id: string) {
    const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
    return user
  }
  async updateProfile(id: ObjectId, data: User) {
    if (data.avatar_url !== '') {
      const item = await databaseService.users.findOne({ _id: new ObjectId(id) })
      const avatarUrl = item?.avatar_url
      if (avatarUrl) {
        const publicId = avatarUrl.split('/').pop()?.split('.')[0]
        if (publicId) {
          await cloudinary.uploader.destroy(publicId)
        }
      }
    }
    if (typeof data.permissions === 'string') {
      data.permissions = JSON.parse(data.permissions)
    }
    const profile = await databaseService.users.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { returnDocument: 'after' }
    )
    return profile
  }
  async deleteProfile(id: string) {
    const user = await databaseService.users.deleteOne({ _id: new ObjectId(id) })
    return user
  }
}
const userService = new UserService()
export default userService
