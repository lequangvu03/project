import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import inboundOrderService from '~/services/inbound-order.services'

export const useGetInboundOrdersQuery = () => {
  return useQuery({
    queryKey: ['INBOUND_ORDER'],
    queryFn: inboundOrderService.getInboundOrder
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
