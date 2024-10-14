import { ObjectId } from 'mongodb'

interface OrderItemType {
  _id?: ObjectId
  item_id: ObjectId
  quantity: number
  price_per_item: number
}

export default class OrderItem {
  _id?: ObjectId
  item_id: ObjectId
  quantity: number
  price_per_item: number

  constructor(orderItem: OrderItemType) {
    this._id = orderItem._id
    this.item_id = orderItem.item_id
    this.quantity = orderItem.quantity
    this.price_per_item = orderItem.price_per_item // Assuming price_per_item is a number field in your schema. If it's a string, you'll need to convert it to a number before assigning it.  // Example: this.price_per_item = Number(orderItem.price_per_item)  // or parseInt() or parseFloat() if it's a string representation of a number.  // If you want to add
  }
}
