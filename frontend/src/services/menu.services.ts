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
  deleteDish: (ids: string[]) => {
    return sendDelete(`/menu`, {
      ids
    })
  }
}

export default menuServices
