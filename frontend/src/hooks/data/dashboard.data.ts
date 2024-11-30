import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dashboardServices from "~/services/dashboard.services";

export const useGetDashboardOverview = function () {
    return useQuery({
        queryKey: ["DASHBOARD"],
        queryFn: dashboardServices.getDashboard
    })
}