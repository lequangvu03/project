import { ObjectId } from 'mongodb'

interface OrderVariantType {
  _id?: ObjectId
  order_item_id: ObjectId
  variant_name: string
  selected_option: string
  price_adjustment: number
}

export default class OrderVariant {
  _id?: ObjectId
  order_item_id: ObjectId
  variant_name: string
  selected_option: string
  price_adjustment: number

  constructor(orderVariant: OrderVariantType) {
    this._id = orderVariant._id
    this.order_item_id = orderVariant.order_item_id
    this.variant_name = orderVariant.variant_name
    this.selected_option = orderVariant.selected_option
    this.price_adjustment = orderVariant.price_adjustment
  }
}
