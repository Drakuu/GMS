// app/ProtectedRoute.js
'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { verifyAuth, checkRoles, getAuthToken, removeAuthToken, } from '@/utils/authSliceUtils';
import { setToken, setUser } from '@/store/slices/authSlice';
import Loading from './loading';
// import unauthorized from '@/app/unauthorized'

export default function ProtectedRoute({ children, allowedRoles }) {
  const [authChecked, setAuthChecked] = useState(false);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // If we have a token but no user data, verify it
        const localToken = getAuthToken() || getCookieToken();

        if (localToken && (!user || !isAuthenticated)) {
          await dispatch(verifyAuth()).unwrap();
        }

        // If still not authenticated, redirect
        if (!localToken || !isAuthenticated) {
          router.push('/landing');
          return;
        }

        // Check roles if specified
        if (allowedRoles && user && !checkRoles(user, allowedRoles)) {
          router.push('/unauthorized');
          return;
        }

        setAuthChecked(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthToken();
        removeCookieToken();
        router.push('/landing');
      }
    };

    checkAuth();
  }, [dispatch, router, allowedRoles, user, isAuthenticated]);

  console.log('Auth state:', { user, token, isAuthenticated, authChecked });

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return children;
}