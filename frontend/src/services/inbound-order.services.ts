import { sendDelete, sendGet, sendPatch, sendPost } from '~/api/request'

const inboundOrderService = {
  getInboundOrder: function () {
    return sendGet('/inboundOrder')
  },

  updateInboundOrder: function ({
    id,
    body
  }: {
    id: string
    body: {
      inbound_order_items: {
        _id: string
        quantity: number
      }[]
      total_price: number
    }
  }) {
    return sendPatch('/inboundOrder/' + id, body)
  },

  deleteInboundOrder: function (id: string) {
    return sendDelete('/inboundOrder' + id)
  },

  addInboundOrder: function (body: {
    inbound_order_items: {
      _id: string
      quantity: number
    }[]
    total_price: number
  }) {
    return sendPost('/inboundOrder', body)
  }
}

export default inboundOrderService
