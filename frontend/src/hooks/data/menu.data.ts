import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import menuServices from '~/services/menu.services'

export const useGetDishesQuery = (args?: { categoryId?: string; tag?: string; page?: number }) => {
  return useQuery({
    queryKey: ['DISHES', args?.categoryId, args?.tag, args?.page],
    queryFn: () => {
      return menuServices.getDishes({
        categoryId: args?.categoryId,
        tag: args?.tag,
        page: args?.page
      })
    },
    placeholderData: (prev) => prev
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
      queryClient.invalidateQueries({
        queryKey: ['CATEGORIES']
      })
    }
  })
}

export const useAddMenuItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: menuServices.addMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['DISHES']
      })
    }
  })
}

export const useUpdateMenuItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: menuServices.addMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['DISHES']
      })
    }
  })
}

export const useGetMenuItemDetailQuery = (params: { id?: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['DISHE_DETAILS', params?.id],
    queryFn: () => menuServices.getDishDetail(params?.id as string),
    enabled: params?.enabled
  })
}
