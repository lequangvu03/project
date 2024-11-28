import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import categoriesServices from '~/services/categories.services'

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: categoriesServices.getCategories
  })
}

export const useGetCategoryByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['CATEGORIES_DETAILS', id],
    queryFn: () => categoriesServices.getCategoryById(id)
  })
}

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoriesServices.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['CATEGORIES']
      })
    }
  })
}

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: categoriesServices.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['CATEGORIES']
      })
    }
  })
}
