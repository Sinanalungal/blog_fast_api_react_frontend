import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosIntrecepters";

// Create a Context
export const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User details
  const [loading, setLoading] = useState(true); 

  async function fetchUser() {
    try {
      const userData = await axiosInstance.get(`user_routes/user`,{},{withCredentials:true})
      setUser(userData.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); 
    } finally {
      setLoading(false); // Stop loading
    }
  }
  

  return (
    <UserContext.Provider value={{ user, setUser, loading ,fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
