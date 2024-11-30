import { sendDelete, sendGet } from "~/api/request";

const ordersServices = {
    getOrders: function ({page = 1, limit =9}: {page: number,limit?: number}) {
        return sendGet(`/order?page=${page}&limit=${limit}&sortBy=created_at&sortOrder=asc`)
    },
    deleteOrder: function (id:string) {
        return sendDelete("/order/"+id)
    }
}

export default ordersServices;