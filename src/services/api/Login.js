import axios from "axios"
import { BASE_URL } from "../../constents"

export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/login`, data,{withCredentials:true})
        return response.data

    } catch (error) {
        throw error;
    }
};