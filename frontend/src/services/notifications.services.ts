import { sendGet, sendPut } from '~/api/request'

const notificationsService = {
  getNotifications: ({ page, limit, status }: { page: number; limit: number; status: number }) => {
    return sendGet(`/notification?page=${page}&limit=${limit}&status=${status}&sortBy=created_at&sortOrder=desc`)
  },
  getNotificationCount: () => {
    return sendGet(`/notification/count`)
  },
  readNotification: (_id: string) => {
    return sendPut(`/notification/read/${_id}`)
  },
  markAllAsRead: (ids: string[]) => {
    return sendPut(`/notification/read/all`, { ids })
  }
}

export default notificationsService
