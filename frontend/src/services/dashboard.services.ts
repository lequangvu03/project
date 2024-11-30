import { sendGet } from "~/api/request"

const dashboardServices = { 
    getDashboard: function () {
        return sendGet("/dashboard/overview")
    }
}

export default dashboardServices;