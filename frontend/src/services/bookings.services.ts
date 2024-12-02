import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'

const bookingsServices = {
  getBookings: () => {
    return sendGet('/booking')
  },
  addBooking: function (body: {
    table_number: number
    booking_time: number
    customer_name: string
    customer_phone: number
  }) {
    return sendPost('/booking', body)
  },

  updateBooking: function ({ id, body }: { id: string; body: {} }) {
    return sendPut('/booking/' + id, body)
  },
  deleteBooking: function (id: string) {
    return sendDelete('/booking/' + id)
  }
}

export default bookingsServices
