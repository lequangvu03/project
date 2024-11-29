import { sendDelete, sendGet } from "~/api/request"

const productServices = {
    getProducts: ({page, limit = 9}:{page: number, limit: number}) => {
        return sendGet(`/menu?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
    }
}

export default productServices;