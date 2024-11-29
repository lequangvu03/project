import { sendDelete, sendGet, sendPut } from '~/api/request'
import { PermissionType } from '~/definitions/constant/types.constant'

const profilesServices = {
  getProfiles: () => {
    return sendGet('/profile')
  },
  getProfileById: (id: string) => {
    return sendGet('/profile/' + id)
  },

  deleleProfileById: (id: string) => {
    return sendDelete('/profile/' + id)
  },
  getMyProfile: () => {
    return sendGet('/profile/me')
  },
  updateMyProfile: (body: { name?: string; permissions?: PermissionType[]; ipAddress?: string[]; image?: File }) => {
    return sendPut('/profile/me', body)
  }
}

export default profilesServices
