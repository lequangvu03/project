import profilesServices from "~/services/profiles.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProfilesQuery = function () {
    return useQuery({
        queryKey: ["PROFILES"],
        queryFn: profilesServices.getProfiles
    })
}

export const useDeleteProfileQuery = function () {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: profilesServices.deleleProfileById,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["PROFILES"]
            })
        }
    })
}