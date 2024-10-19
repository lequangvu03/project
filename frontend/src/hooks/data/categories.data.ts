import categoriesServices from '~/services/categories.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: categoriesServices.getCategories
  })
}
