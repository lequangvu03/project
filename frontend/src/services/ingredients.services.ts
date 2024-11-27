import { sendGet } from "~/api/request";

const ingredientsServices = {
    getIngredients: () => {
        return sendGet("/ingredients")
    }
}

export default ingredientsServices;