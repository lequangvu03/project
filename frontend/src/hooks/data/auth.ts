import { useMutation } from '@tanstack/react-query'
import authServices from '~/api/modules/auth'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authServices.login
  })
}
