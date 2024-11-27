import { sendDelete, sendGet } from '~/api/request'

const menuServices = {
  getDishes: ({ categoryId }: { categoryId?: string }) => {
    return sendGet('/menu', {
      categoryId: categoryId
    })
  },
  deleteDish: (id: string) => {
    return sendDelete(`/menu/${id}`)
  }
}

export default menuServices
