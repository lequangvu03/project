import { useMutation, useQueryClient } from "@tanstack/react-query"
import authServices from "~/services/auth.services"

export const useSendOtpMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authServices.sendOTP,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SENDOTP']
      })
    }
  })
}
export const usesendVerifyOTPMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authServices.sendVerifyOTP,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['SENDVERIFYOTP']
      })
    }
  })
}
export const useresetPasswordMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authServices.resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['RESETPASSWORD']
      })
    }
  })
}