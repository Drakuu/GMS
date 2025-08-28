// app/ProtectedRoute.js
'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  verifyAuth,
  checkRoles,
  getAuthToken,
  removeAuthToken,
  getCookieToken,
  removeCookieToken
} from '@/utils/authSliceUtils';
import { setToken, setUser } from '@/store/slices/authSlice';
import Loading from './loading';

export default function ProtectedRoute({ children, allowedRoles }) {
  const [authChecked, setAuthChecked] = useState(false);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const checkAuth = async () => {
      try {
        // First check localStorage/cookies for token
        const localToken = getAuthToken() || getCookieToken();

        // If we have a local token but no Redux state, verify it
        if (localToken && (!token || !isAuthenticated || !user)) {
          try {
            // Use the verifyAuth function directly instead of dispatching
            const { isValid, user: verifiedUser } = await verifyAuth();

            if (isMounted && isValid && verifiedUser) {
              dispatch(setUser(verifiedUser));
              dispatch(setToken(localToken));

              if (!allowedRoles || checkRoles(verifiedUser, allowedRoles)) {
                setAuthChecked(true);
                return;
              } else {
                router.push('/unauthorized');
                return;
              }
            }
          } catch (error) {
            console.error('Token verification failed:', error);
          }
        }

        // First check if we have a valid token in state
        if (token && isAuthenticated && user) {
          if (!allowedRoles || checkRoles(user, allowedRoles)) {
            if (isMounted) setAuthChecked(true);
            return;
          } else {
            router.push('/unauthorized');
            return;
          }
        }

        // If no valid token in state or verification failed, redirect to landing
        if (isMounted) {
          removeAuthToken();
          removeCookieToken();
          router.push('/landing');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (isMounted && retryCount < maxRetries) {
          retryCount++;
          setTimeout(checkAuth, 1000); // Retry after 1 second
        } else if (isMounted) {
          removeAuthToken();
          removeCookieToken();
          router.push('/landing');
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router, allowedRoles, token, isAuthenticated, user]);

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