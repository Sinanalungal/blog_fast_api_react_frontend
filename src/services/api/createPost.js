import axios from 'axios';
import { BASE_URL } from '../../constents';
import axiosInstance from '../../axios/axiosIntrecepters';


export const createPost = async (postData) => {
    try {
        const response = await axiosInstance.post(`blogs/`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; 
    } catch (error) {
        console.error('Error creating post:', error.response ? error.response.data : error.message);
        throw error; 
    }
};
