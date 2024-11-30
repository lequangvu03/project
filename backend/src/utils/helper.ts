import { ObjectId } from 'mongodb'
import { InboundOrderItemType } from '~/models/schemas/inboundOrder.schema'

export const constructInboundOrdersArray = (inbound_order_items: []): InboundOrderItemType[] => {
  const inbound_order_items_array = [] as InboundOrderItemType[]
  inbound_order_items.forEach((item: InboundOrderItemType) => {
    inbound_order_items_array.push({
      item_id: new ObjectId(item.item_id),
      quantity: item.quantity
    } as InboundOrderItemType)
  })
  return inbound_order_items_array
}
