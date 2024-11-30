import { ObjectId } from 'mongodb'
import { ChangeType } from '~/constants/enums'

export interface InboundOrderItemType {
  item_id: ObjectId
  quantity: number
}
interface InboundOrderType {
  _id?: ObjectId
  inbound_order_items: InboundOrderItemType[]
  total_price: number
  created_at?: number
  updated_at?: number
}

export default class InboundOrder {
  _id?: ObjectId
  inbound_order_items: InboundOrderItemType[]
  total_price: number
  created_at?: number
  updated_at?: number

  constructor(log: InboundOrderType) {
    const date = Date.now()
    this._id = log._id
    this.inbound_order_items = log.inbound_order_items
    this.total_price = log.total_price
    this.created_at = log.created_at || date
    this.updated_at = log.updated_at || date
  }
}
