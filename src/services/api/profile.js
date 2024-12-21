import axiosInstance from "../../axios/axiosIntrecepters";

export const updateUserProfile = async (profileData) => {
    const response = await axiosInstance.put('user-profile/', profileData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};