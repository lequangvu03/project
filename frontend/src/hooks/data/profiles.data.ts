import profilesServices from '~/services/profiles.services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetMyProfileQuery = () => {
  return useQuery({
    queryKey: ['MY_PROFILE'],
    queryFn: profilesServices.getMyProfile
  })
}

export const useGetProfilesQuery = function () {
  return useQuery({
    queryKey: ['PROFILES'],
    queryFn: profilesServices.getProfiles
  })
}

export const useUpdateMyProfileMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: profilesServices.updateMyProfile,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['MY_PROFILE']
      })
      queryClient.invalidateQueries({
        queryKey: ['PROFILES']
      })
    }
  })
}

export const useDeleteProfileQuery = function () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: profilesServices.deleleProfileById,
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: ['PROFILES']
      })
    }
  })
}
