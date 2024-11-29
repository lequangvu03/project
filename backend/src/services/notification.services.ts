import { ObjectId } from 'mongodb'
import { notificationRoleType, NotificationStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'

class NotificationService {
  async getNotifications({ limit, page }: { limit?: number; page?: number }) {
    limit = limit && Number.isInteger(limit) ? limit : 10 // Mặc định là 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Mặc định là 1
    const notifications = await databaseService.notifications
      .find()
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    const total = await databaseService.notifications.countDocuments()
    return { notifications, total }
  }
  async updateReadNotifications(id: string) {
    const result = await databaseService.notifications.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: NotificationStatus.Read } }
    )
    return result
  }
}
const notificationService = new NotificationService()

export default notificationService
