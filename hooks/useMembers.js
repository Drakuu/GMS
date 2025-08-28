// hooks/useMembers.js
import { useDispatch, useSelector } from 'react-redux';
import {
   fetchMembers,
   createMember,
   updateMember,
   selectMembers,
   selectMemberLoading,
   selectMemberFilters
} from '@/store/slices/memberSlice';

export const useMembers = (gymId) => {
   const dispatch = useDispatch();
   const members = useSelector(selectMembers);
   const loading = useSelector(selectMemberLoading);
   const filters = useSelector(selectMemberFilters);

   const loadMembers = (params = {}) => {
      dispatch(fetchMembers({ gymId, ...params }));
   };

   const addMember = (memberData) => {
      return dispatch(createMember(memberData));
   };

   const modifyMember = (id, updateData) => {
      return dispatch(updateMember({ id, updateData }));
   };

   const getMember = (id) => {
      return members.find(member => member._id === id);
   };

   const getMembersByStatus = (status) => {
      return members.filter(member => member.status === status);
   };

   return {
      members,
      loading,
      filters,
      loadMembers,
      addMember,
      modifyMember,
      getMember,
      getMembersByStatus
   };
};