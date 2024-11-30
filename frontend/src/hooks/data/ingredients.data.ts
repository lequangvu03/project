import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ingredientsServices from "~/services/ingredients.services"

export const useGetIngredientsQuery = function () {
    return useQuery({
        queryKey: ["INGREDIENTS"],
        queryFn: ingredientsServices.getIngredients
        
    })
}


export const useAddIngredientQuery = function () {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ingredientsServices.addIngredient,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["INGREDIENTS"],
            })
        }
    })
}

export const useUpdateIngredientMutation = function () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ingredientsServices.updateIngredient,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["INGREDIENTS"],
            })
        }
    })
}

export const useDeleteIngredientQuery = function () {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ingredientsServices.deleteIngredient,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["INGREDIENTS"]
            })
        }
    })
}