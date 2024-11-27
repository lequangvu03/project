import { sendGet, sendDelete, sendPatch,  } from "~/api/request";

const profilesServices = {
    getProfiles: () => {
        return sendGet("/profile")
    },
    getProfileById: (id: string) => {
        return sendGet("/profile/"+id)
    },

    deleleProfileById: (id: string) => {
        return sendDelete("/profile/"+id)
    }

}

export default profilesServices;