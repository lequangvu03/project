import ordersServices from "~/services/orders.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrdersQuery = function () {
    return useQuery({
        queryKey: ["ORDERS"],
        queryFn: ordersServices.getOrders
    })
}