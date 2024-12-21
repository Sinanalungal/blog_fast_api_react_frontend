import axios from 'axios';
import { BASE_URL } from '../../constents';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/register`, userData,{withCredentials:true});
        return response.data; 
    } catch (error) {
        throw error; 
    }
};
