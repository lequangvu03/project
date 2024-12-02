import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import bookingsServices from '~/services/bookings.services'

export const useGetBooingQuery = function () {
  return useQuery({
    queryKey: ['BOOKINGS'],
    queryFn: bookingsServices.getBookings
  })
}

export const useAddBookingMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bookingsServices.addBooking,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['BOOKINGS']
      })
    }
  })
}

export const useUpdateBookingMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bookingsServices.updateBooking,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['BOOKINGS']
      })
    }
  })
}

export const useDeleteBookingMutation = function () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: bookingsServices.deleteBooking,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['BOOKINGS']
      })
    }
  })
}
