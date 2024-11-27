import { sendGet } from "~/api/request";


const bookingsServices = {
    getBookings: () => {
        return sendGet("/booking")
    }
}

export default bookingsServices;