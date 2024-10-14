import databaseService from '~/services/database.services'

class NotificationService {
  async getNotifications() {
    const notifications = await databaseService.notifications.find().toArray()
    return notifications
  }
}
const notificationService = new NotificationService()

export default notificationService