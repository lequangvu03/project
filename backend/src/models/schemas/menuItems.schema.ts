import { ObjectId } from 'mongodb'

interface MenuItemType {
  _id: ObjectId
  name: string
  description: string
  price: number
  category_id: ObjectId
  availability: boolean
  stock: number
  image?: string
  created_at?: number
  updated_at?: number
}

export default class MenuItem {
  _id: ObjectId
  name: string
  description: string
  price: number
  category_id: ObjectId
  availability: boolean
  stock: number
  image?: string
  created_at?: number
  updated_at?: number

  constructor(menuItem: MenuItemType) {
    const date = Date.now()
    this._id = menuItem._id
    this.name = menuItem.name
    this.description = menuItem.description
    this.price = menuItem.price
    this.category_id = menuItem.category_id
    this.availability = menuItem.availability
    this.stock = menuItem.stock
    this.image = menuItem.image || ''
    this.created_at = menuItem.created_at || date
    this.updated_at = menuItem.updated_at || date
  }
}
