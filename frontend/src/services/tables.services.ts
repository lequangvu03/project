import { sendDelete, sendGet, sendPost, sendPut } from "~/api/request";


const tablesServices = {
    getTables: () => {
        return sendGet("/tables")
    },
    addTable: (body: {
        table_number: number,
        capacity: number,
        location: string
    }) => {
        return sendPost("/table", body)
    },
    updateTable: ({ id, body }:
        { id: string, body: { table_number: number,
        capacity: number,
        location: string} })=> {
        sendPut(`/table/${id}`, body)
    },
    deleteTable: (id: string) => {
        return sendDelete("/table"+ id)
    }
}

export default tablesServices;