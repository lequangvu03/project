import { sendDelete, sendGet, sendPost, sendPut } from "~/api/request";

const ingredientsServices = {
    getIngredients: () => {
        return sendGet("/ingredient")
    },

    updateIngredient: function ({id, body}: {id: string, body: {name: string, stock: number}}) {
        return sendPut(`/ingredient/${id}`, body)
    }
    ,
    deleteIngredient: function (id: string) {
        return sendDelete(`/ingredient/${id}`)
    },
    addIngredient: function (body: { name: string, unit: string, price: number }) {
        return sendPost("/ingredient", body)
    }
}

export default ingredientsServices;