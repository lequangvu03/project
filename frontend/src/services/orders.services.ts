import { sendGet } from "~/api/request";

const ordersServices = {
    getOrders: function () {
        return sendGet("/order")
    }
}

export default ordersServices;