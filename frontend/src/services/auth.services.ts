import { publicPost, publicGet, publicPut } from '~/api/request'

const authServices = {
  sendOTP: function (body: { email: string }) {
    return publicPost('/auth/send-otp-forgot-password', body)
  },
  sendVerifyOTP: function (body: { otp_id: string; otp: string }) {
    return publicPost('/auth/verify-otp-forgot-password', body)
  },
  resetPassword: function (body: { otp_id: string; email: string; password: string; confirm_password: string }) {
    return publicPut('auth/reset-password', body)
  }
}
