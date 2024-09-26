import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  description?: string
  created_at?: number
  updated_at?: number
}

export default class Category {
  _id?: ObjectId
  name: string
  description?: string
  created_at: number
  updated_at: number

  constructor(category: CategoryType) {
    const date = Date.now()
    this._id = category._id
    this.name = category.name
    this.description = category.description || ''
    this.created_at = category.created_at || date
    this.updated_at = category.updated_at || date
  }
}
