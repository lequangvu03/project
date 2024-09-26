import { ObjectId } from 'mongodb'

interface OrderVariantType {
  variant_name: string
  selected_option: string
  price_adjustment: number
}

interface OrderItemType {
  _id?: ObjectId
  order_id: ObjectId
  item_id: ObjectId
  item_name: string
  selected_variants: OrderVariantType[]
  quantity: number
  final_price: number
  status: string
}

export default class OrderItem {
  _id?: ObjectId
  order_id: ObjectId
  item_id: ObjectId
  item_name: string
  selected_variants: OrderVariantType[]
  quantity: number
  final_price: number
  status: string

  constructor(orderItem: OrderItemType) {
    this._id = orderItem._id
    this.order_id = orderItem.order_id
    this.item_id = orderItem.item_id
    this.item_name = orderItem.item_name
    this.selected_variants = orderItem.selected_variants
    this.quantity = orderItem.quantity
    this.final_price = orderItem.final_price
    this.status = orderItem.status
  }
}
