import { sendGet } from "~/api/request";


const tablesServices = {
    getTables: () => {
        return sendGet("/tables")
    }
}

export default tablesServices;