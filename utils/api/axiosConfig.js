// utils/api/axiosConfig.js
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
   baseURL,
   withCredentials: true,
   headers: { 'Content-Type': 'application/json'},
   timeout: 20000,
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         // Handle unauthorized access
         localStorage.removeItem('authToken');
         sessionStorage.removeItem('authToken');
         window.location.href = '/login';
      }
      return Promise.reject(error);
   }
);

export default axiosInstance;