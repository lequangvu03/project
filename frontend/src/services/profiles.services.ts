import { sendDelete, sendGet, sendPost, sendPut } from '~/api/request'
import { RoleType } from '~/definitions/constant/types.constant'

const profilesServices = {
  getProfiles: () => {
    return sendGet('/profile')
  },
  getProfileById: (id: string) => {
    return sendGet('/profile/' + id)
  },
  addEmployeeAccount: (body: {
    name: string
    role?: RoleType
    email: string
    password: string
    confirmPassword: string
  }) => {
    return sendPost('/profile', body)
  },
  updateEmployeeAccount: (params: { id: string; body: FormData }) => {
    return sendPut('/profile/' + params.id, params.body)
  },
  deleleProfileById: (id: string) => {
    return sendDelete('/profile/' + id)
  },
  getMyProfile: () => {
    return sendGet('/profile/me')
  },
  updateMyProfile: (body: FormData) => {
    return sendPut('/profile/me', body)
  }
}

export default profilesServices
