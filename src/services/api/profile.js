import axiosInstance from "../../axios/axiosIntrecepters";

export const updateUserProfile = async (profileData) => {
    try {
        const response = await axiosInstance.put('user_routes/update', profileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, 
        });
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;  
    }
};
