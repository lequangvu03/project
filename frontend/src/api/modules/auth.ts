import { TLoginResponse } from '~/models/auth'

import http from '../http'

const authServices = {
  login: async (body: { email: string; password: string }) => {
    return http.post<TLoginResponse>('/auth/login', {
      body: JSON.stringify(body)
    })
  }
}

export default authServices
