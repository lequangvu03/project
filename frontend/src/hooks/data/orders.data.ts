import ordersServices from "~/services/orders.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOrdersQuery = function ({page}: {page: number}) {
    return useQuery({
        queryKey: ["ORDERS", page],
        queryFn: async () => {
return await ordersServices.getOrders ({page})
        }
    })
}