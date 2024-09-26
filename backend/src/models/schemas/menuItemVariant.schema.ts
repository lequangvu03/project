import { ObjectId } from 'mongodb'

interface MenuItemVariantType {
  _id?: ObjectId
  menu_item_id: ObjectId
  name: string
  option_name: string
  count: number
  price_adjustment: number
}

export default class MenuItemVariant {
  _id?: ObjectId
  menu_item_id: ObjectId
  name: string
  option_name: string
  count: number
  price_adjustment: number

  constructor(variant: MenuItemVariantType) {
    this._id = variant._id
    this.menu_item_id = variant.menu_item_id
    this.name = variant.name
    this.option_name = variant.option_name
    this.count = variant.count
    this.price_adjustment = variant.price_adjustment
  }
}
