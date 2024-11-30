import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'

const ordersServices = {
  getOrders: function ({ page = 1, limit = 9 }: { page: number; limit?: number }) {
    return sendGet(`/order?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
  },

  addOrder: function (body: {
    table_number: number
    total_price: number
    order_items: {
      item_id: string
      quantity: number
    }
    payment_status: string
    order_status: string
  }) {
    return sendPost(`/order`, body)
  },

  updateOrder: function ({
    id,
    body
  }: {
    id: string
    body: {
      order_items: {
        item_id: string
        quantity: number
      }[]
    }
  }) {
    return sendPut('/order' + id, body)
  },

  deleteOrder: function (id: string) {
    return sendDelete('/order/' + id)
  }
}

export default ordersServices
