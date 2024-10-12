import { ObjectId } from 'mongodb'
import { RoleType, UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  email: string
  password: string
  created_at?: number
  updated_at?: number
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  role?: RoleType
}

export default class User {
  _id?: ObjectId
  email: string
  password: string
  created_at: number
  updated_at: number
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  role: RoleType

  constructor(user: UserType) {
    const date = Date.now()
    this._id = user._id
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.email_verify_token = user.email_verify_token || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.role = user.role || RoleType.Employee
  }
}
