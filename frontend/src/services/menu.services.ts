import { sendDelete, sendGet, sendPost } from '~/api/request'
import { identity, pickBy } from 'lodash'
const menuServices = {
  getDishes: ({
    categoryId,
    tag,
    page = 1,
    limit = 10
  }: {
    categoryId?: string
    tag?: string
    page?: number
    limit?: number
  }) => {
    return sendGet(
      `/menu`,
      pickBy(
        {
          categoryId,
          tag,
          page,
          limit
        },
        identity
      )
    )
  },
  deleteDish: (id: string) => {
    return sendDelete(`/menu/${id}`)
  },
  addMenuItem: (body: FormData) => {
    return sendPost('/menu', body)
  }
}

export default menuServices
