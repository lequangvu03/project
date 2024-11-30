import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import notificationsService from '~/services/notifications.services'

export const useGetNotificationAllQuery = function ({
  page,
  limit,
  status
}: {
  page: number
  limit: number
  status: number
}) {
  return useQuery({
    queryKey: ['NOTIFICATIONS', page, status],
    queryFn: function () {
      return notificationsService.getNotifications({ limit: limit, page: page, status: status })
    }
  })
}
export const useReadNotificationMutation = function () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsService.readNotification,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['NOTIFICATIONS']
      })
    }
  })
}
export const useMarkAllAsReadMutation = function () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['READALLNOTIFICATIONS']
      })
    }
  })
}