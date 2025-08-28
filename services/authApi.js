// services/authApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { handleApiError } from '@/utils/api/apiHelpers';
import {
   getAuthToken,
   setAuthToken,
   removeAuthToken,
   getCookieToken,
   setCookieToken,
   removeCookieToken
} from '@/utils/authSliceUtils';

// Create axios instance specifically for auth with interceptors
const authAxios = axiosInstance;

// Add auth-specific interceptors
authAxios.interceptors.request.use(config => {
   const token = getAuthToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}, error => Promise.reject(error));

authAxios.interceptors.response.use(
   response => response,
   error => {
      if (error.response?.status === 401) {
         removeAuthToken();
         removeCookieToken();
      }
      return Promise.reject(error);
   }
);

export const authApi = {
   // Signup user
   signup: async (userData) => {
      try {
         const payload = {
            user_name: userData.user_name,
            user_email: userData.user_email,
            user_password: userData.user_password,
            user_phone: userData.user_phone,
            ...(userData.user_role && { user_role: userData.user_role }),
            ...(userData.gym_id && { gym_id: userData.gym_id })
         };

         const response = await authAxios.post('/auth/signup', payload);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Verify signup OTP
   verifySignup: async ({ user_email, user_otp }) => {
      try {
         const response = await authAxios.post('/auth/verify-signup', {
            user_email,
            user_otp
         });

         const token = response.data.token || response.data.data?.token;
         if (token) {
            setAuthToken(token);
            setCookieToken(token);
         }

         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Login user
   login: async (credentials) => {
      try {
         const response = await authAxios.post('/auth/login', {
            user_email: credentials.user_email,
            user_password: credentials.user_password
         });
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Verify login OTP
   verifyLogin: async ({ user_email, otp }) => {
      try {
         const response = await authAxios.post('/auth/verify-login', {
            user_email,
            otp
         });

         const token = response.data.token || response.data.data?.token || getCookieToken();
         if (token) {
            setAuthToken(token);
            setCookieToken(token);
         }

         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Verify authentication token
   verifyAuth: async () => {
      try {
         const token = getAuthToken() || getCookieToken();
         if (!token) {
            throw new Error('No token found');
         }

         const response = await authAxios.get('/auth/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
         });
         return response.data;
      } catch (error) {
         removeAuthToken();
         removeCookieToken();
         return handleApiError(error);
      }
   },

   // Resend OTP
   resendOtp: async (email) => {
      try {
         const response = await authAxios.post('/auth/resend-otp', { user_email: email });
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Logout (optional - if you have a logout endpoint)
   logout: async () => {
      try {
         const response = await authAxios.post('/auth/logout');
         removeAuthToken();
         removeCookieToken();
         return response.data;
      } catch (error) {
         removeAuthToken();
         removeCookieToken();
         return handleApiError(error);
      }
   }
};