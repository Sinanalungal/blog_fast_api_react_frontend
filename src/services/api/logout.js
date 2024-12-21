import axios from "axios"
import { BASE_URL } from "../../constents"

export const logout = async () => {
    try {
        await axios.post(`${BASE_URL}auth/logout`, {}, { withCredentials: true });
        console.log("Logged out successfully");
      } catch (error) {
        console.error("Error during logout:", error);
      }
};