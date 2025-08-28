// utils/api/apiHelpers.js
export const buildQueryString = (params = {}) => {
   const searchParams = new URLSearchParams();

   Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
         searchParams.append(key, value.toString());
      }
   });

   const queryString = searchParams.toString();
   return queryString ? `?${queryString}` : '';
};

export const handleApiError = (error) => {
   if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
   }
   throw new Error(error.message || 'An unexpected error occurred');
};

export const createFormData = (data) => {
   const formData = new FormData();
   Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
         formData.append(key, value);
      }
   });
   return formData;
};