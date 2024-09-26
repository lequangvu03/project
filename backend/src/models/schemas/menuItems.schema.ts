import { ObjectId } from 'mongodb'

interface MenuItemType {
  _id?: ObjectId
  name: string
  description: string
  base_price: number
  category_id: ObjectId
  availability?: boolean
  count?: number
  variant_ids?: ObjectId[]
  image?: string
  created_at?: number
  updated_at?: number
}

export default class MenuItem {
  _id?: ObjectId
  name: string
  description: string
  base_price: number
  category_id: ObjectId
  availability: boolean
  count: number
  variant_ids: ObjectId[]
  image?: string
  created_at: number
  updated_at: number

  constructor(menuItem: MenuItemType) {
    const date = Date.now()
    this._id = menuItem._id
    this.name = menuItem.name
    this.description = menuItem.description
    this.base_price = menuItem.base_price
    this.category_id = menuItem.category_id
    this.availability = menuItem.availability || true
    this.count = menuItem.count || 0
    this.variant_ids = menuItem.variant_ids || []
    this.image = menuItem.image || ''
    this.created_at = menuItem.created_at || date
    this.updated_at = menuItem.updated_at || date
  }
}
