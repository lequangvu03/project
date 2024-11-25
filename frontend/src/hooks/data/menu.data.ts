import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import menuServices from '~/services/menu.services'

export const useGetDishesQuery = (args?: { categoryId?: string }) => {
  return useQuery({
    queryKey: ['DISHES'],
    queryFn: () =>
      menuServices.getDishes({
        categoryId: args?.categoryId
      })
  })
}

export const useDeleteDishQuery = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: menuServices.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['DISHES']
      })
    }
  })
}
