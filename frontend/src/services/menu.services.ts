import { sendGet } from '~/api/request'

const menuServices = {
  getDishes: ({ categoryId }: { categoryId?: string }) => {
    return sendGet('/menu', {
      categoryId: categoryId
    })
  }
}

export default menuServices
