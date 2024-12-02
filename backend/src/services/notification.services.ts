import { ObjectId } from 'mongodb'
import { notificationRoleType, NotificationStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'

class NotificationService {
  async getNotifications({ limit, page, status }: { limit?: number; page?: number; status?: number }) {
    limit = limit && Number.isInteger(limit) ? limit : 10 // Mặc định là 10
    page = page && Number.isInteger(page) && page > 0 ? page : 1 // Mặc định là 1
    const filter: Record<string, any> = {}
    if (status === 0 || status === 1) {
      filter.status = status
    }
    const notifications = await databaseService.notifications
      .find(filter)
      .sort({ created_at: -1 })
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
  async updateAllReadNotifications(ids: string[]) {
    // Chuyển đổi các id từ string sang ObjectId để sử dụng trong MongoDB
    const objectIds = ids.map((id) => new ObjectId(id))
    const result = await databaseService.notifications.updateMany(
      { _id: { $in: objectIds } }, // Lọc các thông báo theo danh sách _id
      { $set: { status: 1 } } // Cập nhật trạng thái thành đã đọc
    )

    return result
  }
  async getCountReadNotifications() {
    const count = await databaseService.notifications.countDocuments({
      status: NotificationStatus.Unread
    })
    return { count }
  }
}
const notificationService = new NotificationService()

export default notificationService
