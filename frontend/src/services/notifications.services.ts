import { sendGet } from "~/api/request";

const notificationsService = {
    getNotifications: ({page, limit, status}: {page: number, limit: number, status: number}) => {
        return sendGet(`/notification?page=${page}&limit=${limit}&status=${status}`)
    }
}

export default notificationsService;