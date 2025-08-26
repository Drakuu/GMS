// utils/roleUtils.js
import { ROLES, ROLE_PREFIXES } from '@/lib/constants';

// Get role from token
export const getRoleFromToken = (token) => {
   if (!token) return null;

   try {
      // Decode JWT token (middle part is payload)
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.role || decoded.user_role || null;
   } catch (error) {
      console.error('Error decoding token:', error);
      return null;
   }
};

// Get route prefix for a role
export const getRoutePrefix = (role) => {
   return ROLE_PREFIXES[role] || 'member';
};

// Check if user has required role
export const hasRequiredRole = (userRole, requiredRole) => {
   const roleHierarchy = {
      [ROLES.SUPER_ADMIN]: 4,
      [ROLES.ADMIN]: 3,
      [ROLES.TRAINER]: 2,
      [ROLES.MEMBER]: 1
   };

   return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const getRolePrefix = (role) => {
   return ROLE_PREFIXES[role] || 'member';
};

export const generateProfileUrl = (role, userId = null) => {
   const prefix = getRolePrefix(role);
   let url = `/${prefix}/profile`;

   if (userId) {
      url += `?id=${userId}`;
   }

   return url;
};

export const canViewProfile = (currentUser, targetUserId) => {
   if (!currentUser) return false;

   // Users can always view their own profile
   if (currentUser.id === targetUserId || currentUser._id === targetUserId) {
      return true;
   }

   // Admins and SuperAdmins can view any profile
   return ['SuperAdmin', 'Admin'].includes(currentUser.user_role);
};