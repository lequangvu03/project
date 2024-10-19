import { useQuery } from '@tanstack/react-query'
import menuServices from '~/services/menu.services'

export const useGetDishesQuery = (args: { categoryId?: string }) => {
  return useQuery({
    queryKey: ['DISHES'],
    queryFn: () =>
      menuServices.getDishes({
        categoryId: args?.categoryId
      })
  })
}
