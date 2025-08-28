// services/memberApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const memberApi = {
   // Create a new member
   createMember: async (memberData) => {
      try {
         const response = await axiosInstance.post('/members', memberData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get all members with pagination and filtering
   getMembers: async ({ gymId, page = 1, limit = 20, q = '', status = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ gymId, page, limit, q, status });
         const response = await axiosInstance.get(`/members${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get member by ID
   getMemberById: async (id) => {
      try {
         const response = await axiosInstance.get(`/members/get-by-id?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update member
   updateMember: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/members/update?id=${id}`, updateData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete member (if you have this endpoint)
   deleteMember: async (id) => {
      try {
         const response = await axiosInstance.delete(`/members?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get member by user identifier
   getMemberByUserIdentifier: async (userIdentifier, gymId) => {
      try {
         const queryParams = buildQueryString({ userIdentifier, gymId });
         const response = await axiosInstance.get(`/members/by-user-identifier${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};