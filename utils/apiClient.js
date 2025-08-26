// utils/apiClient.js
import { getAuthToken, getCookieToken } from './authSliceUtils';

export const apiClient = {
   get: async (url, options = {}) => {
      // Check both localStorage and cookies for token
      const token = getAuthToken() || getCookieToken();
      const headers = {
         'Content-Type': 'application/json',
         ...options.headers,
      };

      if (token) {
         headers.Authorization = `Bearer ${token}`;
         console.log('Adding Authorization header with token');
      } else {
         console.warn('No auth token found for API request');
      }

      console.log('Making GET request to:', url);
      console.log('Headers:', headers);

      const response = await fetch(url, {
         ...options,
         headers,
      });

      console.log('Response status:', response.status);
      return response;
   },

   post: async (url, data, options = {}) => {
      const token = getAuthToken() || getCookieToken();
      const headers = {
         'Content-Type': 'application/json',
         ...options.headers,
      };

      if (token) {
         headers.Authorization = `Bearer ${token}`;
         console.log('Adding Authorization header with token');
      }

      console.log('Making POST request to:', url);
      console.log('Request data:', data);

      const response = await fetch(url, {
         method: 'POST',
         headers,
         body: JSON.stringify(data),
         ...options,
      });

      console.log('Response status:', response.status);
      return response;
   },
};