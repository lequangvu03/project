import { useQuery } from "@tanstack/react-query";
import productServices from "~/services/products.services";

export const useGetProductsQuery = function ({ page, limit} : {page: number, limit: number}) {
    return useQuery({
        queryKey: ["PRODUCTS", page],
        queryFn: async function () {
            return productServices.getProducts({
                page: page,
                limit:limit
            })
        }
    })
}