import { ObjectId } from 'mongodb'

interface NotificationType {
  _id?: ObjectId
  recipient_id: ObjectId
  message: string
  title: string
  status: number
  created_at?: number
  updated_at?: number
}

export default class Notification {
  _id?: ObjectId
  recipient_id: ObjectId
  message: string
  title: string
  status: number
  created_at: number
  updated_at: number

  constructor(notification: NotificationType) {
    const date = Date.now()
    this._id = notification._id
    this.recipient_id = notification.recipient_id
    this.message = notification.message
    this.title = notification.title
    this.status = notification.status
    this.created_at = notification.created_at || date
    this.updated_at = notification.updated_at || date
  }
}
