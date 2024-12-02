import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import staffsServices from '~/services/staffs.services'

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ['STAFFS'],
    queryFn: staffsServices.getStaff
  })
}

export const useUpdateCategoryMutation = () => {
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
