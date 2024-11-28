import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'

const categoriesServices = {
  getCategories: () => {
    return sendGet('/category')
  },
  addCategory: (body: { name: string; description: string }) => {
    return sendPost('/category', body)
  },
  deleteCategory: (id: string) => {
    return sendDelete(`/category/${id}`)
  },
  getCategoryById: (id: string) => {
    return sendGet(`/category`, {
      id
    })
  },
  updateCategory: ({ id, body }: { id: string; body: { name: string; description: string } }) => {
    return sendPut(`/category/${id}`, body)
  }
}

export default categoriesServices
