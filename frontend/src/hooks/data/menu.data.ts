import { useQuery } from '@tanstack/react-query'
import { sendPost } from '~/api/request'
import menuServices from '~/services/menu.services'

export const useGetDishesQuery = () => {
  return useQuery({
    queryKey: ['DISHES'],
    queryFn: menuServices.getDishes
  })
}
