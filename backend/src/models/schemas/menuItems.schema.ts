import { ObjectId } from "mongodb"

interface MenuItemType {
  item_id: ObjectId
  name: string
  description: string
  price: number
  category_id: ObjectId
  availability: boolean
  stock: number
  variant_ids: ObjectId[]
  image?: string
}

export class MenuItem {
  item_id: ObjectId
  name: string
  description: string
  price: number
  category_id: ObjectId
  availability: boolean
  stock: number
  variant_ids: ObjectId[]
  image?: string

  constructor(menuItem: MenuItemType) {
    this.item_id = menuItem.item_id
    this.name = menuItem.name
    this.description = menuItem.description
    this.price = menuItem.price
    this.category_id = menuItem.category_id
    this.availability = menuItem.availability
    this.stock = menuItem.stock
    this.variant_ids = menuItem.variant_ids
    this.image = menuItem.image || ''
  }
}