import { sendGet } from "~/api/request";

const ordersServices = {
    getOrders: function ({page = 1, limit =9}: {page: number,limit?: number}) {
        return sendGet(`/order?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
    }
}

export default ordersServices;