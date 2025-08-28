// hooks/useGym.js
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchGymById,
   updateGym,
   selectCurrentGym,
   selectGymLoading
} from '@/store/slices/gymSlice';

export const useGym = (gymId) => {
   const dispatch = useDispatch();
   const gym = useSelector(selectCurrentGym);
   const loading = useSelector(selectGymLoading);

   const loadGym = () => {
      if (gymId) {
         dispatch(fetchGymById(gymId));
      }
   };

   const updateGymDetails = (updateData) => {
      return dispatch(updateGym({ id: gymId, updateData }));
   };

   return {
      gym,
      loading,
      loadGym,
      updateGymDetails
   };
};