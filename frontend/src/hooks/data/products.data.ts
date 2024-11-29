import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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


export const useAddProductMutation = function () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productServices.addProduct,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"]
            })
        }
    })
}

export const useDeleteProductMutation = function () {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: productServices.deleteProduct,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"]
            })
        }
    })
}

export const useUpdateProductMutation = function () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: productServices.updateProduct,
        onSuccess: function () {
                        queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"]
            })
        }
    })
}

export const useGetProductByIdQuery = function ({id, enabled}: {id: string, enabled?: boolean}) {
    return useQuery({
    queryKey: ['PRODUCTS', id],
    queryFn: () => productServices.getProductById(id),
    enabled: enabled
  })
}