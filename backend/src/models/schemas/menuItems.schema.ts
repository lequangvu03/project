import { ObjectId } from 'mongodb'
import { menuItemStatus, TagType } from '~/constants/enums'
interface MenuItemType {
  _id: ObjectId
  name: string
  description: string
  price: number
  category_id: ObjectId
  tag: TagType[]
  stock: number
  image?: string
  ingredients: Array<{
    _id: ObjectId
    quantity: number
    name: string
    unit: string
  }>
  quantity_sold: number
  status: menuItemStatus
  created_at?: number
  updated_at?: number
}

export default class MenuItem {
  _id: ObjectId
  name: string
  description: string
  price: number
  tag: TagType[]
  category_id: ObjectId
  stock: number
  image?: string
  ingredients: Array<{
    _id: ObjectId
    quantity: number
    name: string
    unit: string
  }>
  quantity_sold: number
  status: menuItemStatus
  created_at?: number
  updated_at?: number

  constructor(menuItem: MenuItemType) {
    const date = Date.now()
    this._id = menuItem._id
    this.name = menuItem.name
    this.description = menuItem.description
    this.price = menuItem.price
    this.tag = menuItem.tag
    this.category_id = menuItem.category_id
    this.stock = menuItem.stock || 1
    this.image =
      menuItem.image ||
      'https://res.cloudinary.com/dflvvu32c/image/upload/v1733125769/menu-default-image_220606_web_m1zwe8.png'
    this.ingredients = menuItem.ingredients || []
    this.status = menuItem.status
    this.quantity_sold = menuItem.quantity_sold || 0
    this.created_at = menuItem.created_at || date
    this.updated_at = menuItem.updated_at || date
  }
}
