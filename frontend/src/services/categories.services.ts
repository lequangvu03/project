import { sendDelete, sendGet, sendPost } from '~/api/request'

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
    return sendGet(`/category/${id}`)
  }
}

export default categoriesServices
