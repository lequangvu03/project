import ordersServices from '~/services/orders.services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetOrdersQuery = function ({ page, status, limit }: { page: number; status: number; limit: number }) {
  return useQuery({
    queryKey: ['ORDERS', page, status, limit],
    queryFn: async () => {
      return await ordersServices.getOrders({ page, status, limit })
    }
  })
}
export const useGetOrdersByIdQuery = function (id: string) {
  return useQuery({
    queryKey: ['ORDERS', id],
    queryFn: async () => {
      return await ordersServices.getOrderById(id)
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
export const usePaymentOrderMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ordersServices.paymentOrder,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['ORDERS']
      })
    }
  })
}
