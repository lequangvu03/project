import { sendDelete, sendGet } from '~/api/request'
import { identity, pickBy } from 'lodash'
const menuServices = {
  getDishes: ({ categoryId, tag }: { categoryId?: string; tag?: string }) => {
    return sendGet(
      `/menu`,
      pickBy(
        {
          categoryId,
          tag
        },
        identity
      )
    )
  },
  deleteDish: (id: string) => {
    return sendDelete(`/menu/${id}`)
  }
}

export default menuServices
