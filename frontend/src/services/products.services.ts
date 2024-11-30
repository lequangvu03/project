import { sendDelete, sendGet, sendPost, sendPatch } from "~/api/request"

const productServices = {
    getProducts: ({ page, limit = 9 }: { page: number, limit: number }) => {
        return sendGet(`/menu?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
    },
    addProduct: function (body: any) {
        return sendPost("/menu", body)
    },
    deleteProduct: function (id: string) {
        return sendDelete(`/menu/`+id)
    },
    getProductById: function (id: string) {
        return sendGet("/menu", {id})
    },
    updateProduct: function ({ id, body }: { id: string, body: any }) {
        return sendPatch("/menu", { id, body });
    }
}

export default productServices;