import { sendGet } from "~/api/request";

const notificationsService = {
    getNotifications: () => {
        return sendGet("/notifications")
    }
}

export default notificationsService;