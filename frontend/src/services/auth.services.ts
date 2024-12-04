import { publicPost, publicGet, publicPut, sendPost, sendPut } from '~/api/request'

const authServices = {
  sendOTP: function (body: { email: string }) {
    return sendPost('/auth/send-otp-forgot-password', body)
  },
  sendVerifyOTP: function (body: { otp_id: string; otp: string }) {
    return sendPost('/auth/verify-otp-forgot-password', body)
  },
  resetPassword: function (body: { otp_id: string; email: string; password: string; confirm_password: string }) {
    return sendPut('auth/reset-password', body)
  }
}
export default authServices