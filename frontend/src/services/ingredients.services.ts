import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'

const ingredientsServices = {
  getAllIngredients: () => {
    return sendGet('/ingredient/all')
  },
  getIngredients: ({ page = 1, limit = 12 }: { page?: number; limit?: number }) => {
    return sendGet(`/ingredient?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
  },
  updateIngredient: function ({ id, body }: { id: string; body: { name: string; stock: number } }) {
    return sendPut(`/ingredient/${id}`, body)
  },
  deleteIngredient: function (id: string) {
    return sendDelete(`/ingredient/${id}`)
  },
  addIngredient: function (body: { name: string; unit: string; price: number }) {
    return sendPost('/ingredient', body)
  }
}

export default ingredientsServices
