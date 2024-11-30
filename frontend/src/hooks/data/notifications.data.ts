import { useQuery } from "@tanstack/react-query";
import notificationsService from "~/services/notifications.services";


export const useGetNotificationAllQuery = function ({page,limit, status }: {page: number, limit: number, status: number}) {
    return useQuery({
        queryKey: ["NOTIFICATIONS", page, status],
        queryFn: function () {
            return notificationsService.getNotifications({ limit:limit, page: page, status: status })
        }
    })
}
