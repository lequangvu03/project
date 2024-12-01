import ordersServices from '~/services/orders.services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetOrdersQuery = function ({ page }: { page: number }) {
  return useQuery({
    queryKey: ['ORDERS', page],
    queryFn: async () => {
      return await ordersServices.getOrders({ page })
    }
  })
}

export const useAddOrderMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersServices.addOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['ORDERS']
      })
    }
  })
}

export const useUpdateOrderMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersServices.updateOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['ORDERS']
      })
    }
  })
}

export const useDeleteOrderMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersServices.deleteOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['ORDERS']
      })
    }
  })
}
