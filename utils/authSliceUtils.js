// utils/authSliceUtils.js (keep this file as is)
import axios from 'axios';

export const checkTokenPersistence = () => {
  const token = getAuthToken() || getCookieToken();
  return !!token;
};

// Token Management
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};

export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
  }
};

// Cookie Management
export const setCookieToken = (token, expiresIn = 30 * 24 * 60 * 60) => {
  if (typeof document !== 'undefined') {
    const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
    document.cookie = `auth-token=${token}; expires=${expires}; path=/; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
  }
};

export const getCookieToken = () => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; auth-token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  return null;
};

export const removeCookieToken = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
};

// Auth Verification
export const verifyAuth = async () => {
  const token = getAuthToken() || getCookieToken();
  if (!token) return { isValid: false, user: null };

  try {
    const response = await axios.get('/auth/verify-token', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });
    return { isValid: true, user: response.data.user };
  } catch (error) {
    removeAuthToken();
    removeCookieToken();
    return { isValid: false, user: null };
  }
};

// Role Checking
export const checkRoles = (user, allowedRoles = []) => {
  if (!allowedRoles.length) return true;
  if (!user?.user_role) return false;

  const roleHierarchy = {
    SuperAdmin: ['SuperAdmin', 'Admin', 'Manager', 'Trainer', 'Member'],
    Admin: ['Admin', 'Manager', 'Trainer', 'Member'],
    Manager: ['Manager', 'Trainer', 'Member'],
    Trainer: ['Trainer', 'Member'],
    Member: ['Member']
  };

  return allowedRoles.some(allowedRole =>
    roleHierarchy[user.user_role]?.includes(allowedRole) ||
    user.user_role === allowedRole
  );
};