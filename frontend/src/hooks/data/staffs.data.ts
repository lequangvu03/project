import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import staffsServices from '~/services/staffs.services'

export const useGetStaffsQuery = () => {
  return useQuery({
    queryKey: ['STAFFS'],
    queryFn: staffsServices.getStaff
  })
}
export const useGetStaffsByIdQuery = (params: { id?: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['STAFFS', params?.id],
    queryFn: () => staffsServices.getStaffById(params?.id as string),
    enabled: params?.enabled
  })
}

export const useUpdateStaffMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: staffsServices.updateStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['STAFFS']
      })
    }
  })
}
