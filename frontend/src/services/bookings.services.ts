import { sendGet, sendPost } from "~/api/request";


const bookingsServices = {
    getBookings: () => {
        return sendGet("/booking")
    },
    addBooking: function (body: {
        table_number: number,
        booking_time: number,
        customer_name: string,
        customer_phone: number
    }) {
        return sendPost("/booking", body)  
    }
    
}

export default bookingsServices;