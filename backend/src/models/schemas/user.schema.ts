import { ObjectId } from 'mongodb'
import { permissionType, RoleType, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  email: string
  name: string
  password: string
  created_at?: number
  updated_at?: number
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  role?: RoleType
  avatar_url?: string
  permissions?: permissionType[]
  ipAddress?: string[]
}

export default class User {
  _id?: ObjectId
  email: string
  name: string
  password: string
  created_at: number
  updated_at: number
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  role: RoleType
  avatar_url?: string
  permissions?: permissionType[]
  ipAddress?: string[]

  constructor(user: UserType) {
    const date = Date.now()
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.role = user.role || RoleType.Employee
    this.avatar_url =
      user.avatar_url ||
      'https://res.cloudinary.com/dflvvu32c/image/upload/v1724205205/cd4bd9b0ea2807611ba3a67c331bff0b_pjwbyx.png'
    this.permissions = user.permissions || [0, 4]
    this.ipAddress = user.ipAddress || []
  }
}
