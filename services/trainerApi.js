// services/trainerApi.js
import axiosInstance from '@/utils/api/axiosConfig';
import { buildQueryString, handleApiError } from '@/utils/api/apiHelpers';

export const trainerApi = {
   // Create a new trainer
   createTrainer: async (trainerData) => {
      try {
         const response = await axiosInstance.post('/trainers', trainerData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get all trainers with pagination and filtering
   getTrainers: async ({ gymId, page = 1, limit = 20, q = '', status = '' } = {}) => {
      try {
         const queryParams = buildQueryString({ gymId, page, limit, q, status });
         const response = await axiosInstance.get(`/trainers${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get trainer by ID
   getTrainerById: async (id) => {
      try {
         const response = await axiosInstance.get(`/trainers/get-by-id?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Update trainer
   updateTrainer: async (id, updateData) => {
      try {
         const response = await axiosInstance.patch(`/trainers/update?id=${id}`, updateData);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Delete trainer (if you have this endpoint)
   deleteTrainer: async (id) => {
      try {
         const response = await axiosInstance.delete(`/trainers?id=${id}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Assign member to trainer
   assignMemberToTrainer: async (trainerId, memberId) => {
      try {
         const response = await axiosInstance.post('/trainers/assign-member', {
            trainerId,
            memberId
         });
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Remove member from trainer
   removeMemberFromTrainer: async (trainerId, memberId) => {
      try {
         const response = await axiosInstance.post('/trainers/remove-member', {
            trainerId,
            memberId
         });
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get trainers by specialization
   getTrainersBySpecialization: async (gymId, specialization) => {
      try {
         const queryParams = buildQueryString({ gymId, specialization });
         const response = await axiosInstance.get(`/trainers/by-specialization${queryParams}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   },

   // Get available trainers (with availability)
   getAvailableTrainers: async (gymId) => {
      try {
         const response = await axiosInstance.get(`/trainers/available?gymId=${gymId}`);
         return response.data;
      } catch (error) {
         return handleApiError(error);
      }
   }
};