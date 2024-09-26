import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: number
  user_id: ObjectId
}
export default class RefreshToken implements RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: number
  user_id: ObjectId
  constructor({ _id, token, created_at, user_id }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || Date.now()
    this.user_id = user_id
  }
}
