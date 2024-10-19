import { sendPost } from '~/api/request'

const categoriesServices = {
  getCategories: () => {
    return sendPost('/category')
  }
}

export default categoriesServices
