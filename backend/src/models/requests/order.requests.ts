export interface UpdateOrderReqBody {
  table_number?: number
  order_items?: Array<{ item_id: string; quantity: number; price_per_item: number }>
  total_price?: number
  payment_status?: string
  order_status?: string
}
export interface AddOrderReqBody {
  table_number: number
  order_items: Array<{ item_id: string; quantity: number; price_per_item: number }>
  total_price: number
  payment_status: string
  order_status?: string // Optional: nếu không có thì mặc định là 'false'
}
