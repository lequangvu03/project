import { sendGet } from '~/api/request'

const categoriesServices = {
  getCategories: () => {
    return sendGet('/category')
  }
}

export default categoriesServices
