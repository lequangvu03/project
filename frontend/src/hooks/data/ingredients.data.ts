import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ingredientsServices from '~/services/ingredients.services'

export const useGetIngredientsQuery = function ({ page, limit }: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['INGREDIENTS', page, limit],
    queryFn: async () => {
      return await ingredientsServices.getIngredients({ page, limit })
    }
  })
}
export const useGetIngredientsDetailQuery = (params: { id?: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['DISHE_DETAILS', params?.id],
    queryFn: () => ingredientsServices.getIngredientsDetail(params?.id as string),
    enabled: params?.enabled
  })
}
export const useGetAllIngredientsQuery = function () {
  return useQuery({
    queryKey: ['INGREDIENTS'],
    queryFn: () => ingredientsServices.getAllIngredients()
  })
}

export const useAddIngredientMutation = function () {
    const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ingredientsServices.addIngredient,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['INGREDIENTS']
      })
    }
  })
}

export const useUpdateIngredientMutation = function () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ingredientsServices.updateIngredient,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['INGREDIENTS']
      })
    }
  })
}

export const useDeleteIngredientQuery = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ingredientsServices.deleteIngredient,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['INGREDIENTS']
      })
    }
  })
}
