import { ObjectId } from 'mongodb'
import { ForgotPasswordVerifyStatus, RoleType, UserVerifyStatus } from '~/constants/enums'

interface OtpsType {
  _id?: ObjectId
  user_id: ObjectId
  otp: string
  status?: ForgotPasswordVerifyStatus
  created_at?: number
  expires_at?: number
}

export default class Otp {
  _id?: ObjectId
  user_id: ObjectId
  otp: string
  status: ForgotPasswordVerifyStatus
  created_at?: number
  expires_at?: number

  constructor(otp: OtpsType) {
    const date = Date.now()
    const exp = date + 120 * 1000
    this._id = otp._id
    this.user_id = otp.user_id
    this.otp = otp.otp
    this.status = otp.status || ForgotPasswordVerifyStatus.Unverified
    this.created_at = otp.created_at || date
    this.expires_at = otp.expires_at || exp
  }
}
