import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import menuServices from '~/services/menu.services'

export const useGetDishesQuery = (args?: { categoryId?: string; tag?: string }) => {
  return useQuery({
    queryKey: ['DISHES', args?.categoryId, args?.tag],
    queryFn: () => {
      return menuServices.getDishes({
        categoryId: args?.categoryId,
        tag: args?.tag
      })
    }
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
