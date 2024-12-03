import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'

const ingredientsServices = {
  getAllIngredients: () => {
    return sendGet('/ingredient/all')
  },
  getIngredientsDetail: function (id: string) {
    return sendGet(`/ingredient`, {
      id: id
    })
  },
  getIngredients: ({ page = 1, limit = 12 }: { page?: number; limit?: number }) => {
    return sendGet(`/ingredient?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
  },
  updateIngredient: function ({ id, body }: { id: string; body: any }) {
    return sendPut(`/ingredient/${id}`, body)
  },
  deleteIngredient: function (id: string) {
    return sendDelete(`/ingredient/${id}`)
  },
  addIngredient: function (body: any) {
    return sendPost('/ingredient', body)
  }
}

export default ingredientsServices
