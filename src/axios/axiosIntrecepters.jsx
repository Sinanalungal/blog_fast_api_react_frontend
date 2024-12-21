import axios from 'axios';
import { BASE_URL } from '../constents';
import { logout } from '../services/api/logout';
import { Refresh } from '../services/api/refresh';

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,  
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error,'error in interceptor');

    // Check if the error is due to an expired access token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        const response = await Refresh()
        print('=========================refresh')
        console.log(response);
        

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        const response = await logout()
        console.log(response,'this is the response of log')
        console.log('Refresh token is invalid. Logging out...');
        // // Remove tokens from cookies (handled server-side or through an endpoint)
        // document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        // // Redirect to login page or update app state
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
