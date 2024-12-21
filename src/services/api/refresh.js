import axios from "axios"
import { BASE_URL } from "../../constents"

export const Refresh = async () => {
    try {
        const response = await axios.post(`${BASE_URL}auth/refresh`, {},{withCredentials:true})
        print(response)
        return response

    } catch (error) {
        throw error;
    }
};