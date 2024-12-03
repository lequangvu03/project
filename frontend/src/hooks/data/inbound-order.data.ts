import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import inboundOrderService from '~/services/inbound-order.services'

export const useGetINboundOrdersQuery = function ({ page }: { page: number }) {
  return useQuery({
    queryKey: ['INBOUND_ORDERS', page],
    queryFn: async () => {
      return await inboundOrderService.getInboundOrders({ page })
    }
  })
}
export const useGetINboundByIdOrdersQuery = function (id: string) {
  return useQuery({
    queryKey: ['INBOUND_ORDERS', id],
    queryFn: async () => {
      return await inboundOrderService.getInboundOrdersById(id)
    }
  })
}
export const useAddInboundOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: inboundOrderService.addInboundOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['INBOUND_ORDER']
      })
    }
  })
}

export const useDeleteInboundOrderMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inboundOrderService.deleteInboundOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['INBOUND_ORDER']
      })
    }
  })
}

export const useUpdateInboundOrderMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inboundOrderService.updateInboundOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['INBOUND_ORDER']
      })
    }
  })
}
