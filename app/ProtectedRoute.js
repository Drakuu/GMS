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
    let isMounted = true;

    const verifyAndProtect = async () => {
      try {
        // First check localStorage/cookies for token
        const localToken = getAuthToken() || getCookieToken();

        // If we have a local token but no Redux state, verify it
        if (localToken && !token) {
          const { isValid, user: verifiedUser } = await verifyAuth();
          if (isMounted && isValid && verifiedUser) {
            dispatch(setUser(verifiedUser));
            dispatch(setToken(localToken));
            if (!allowedRoles || checkRoles(verifiedUser, allowedRoles)) {
              setAuthChecked(true);
              return;
            }
          }
        }

        // First check if we have a valid token in state
        if (token && isAuthenticated && user) {
          if (!allowedRoles || checkRoles(user, allowedRoles)) {
            if (isMounted) setAuthChecked(true);
            return;
          }
        }

        // If no valid token in state, verify auth
        const { isValid, user: verifiedUser } = await verifyAuth();

        if (isMounted) {
          if (isValid && verifiedUser) {
            dispatch(setUser(verifiedUser));
            if (verifiedUser.token) {
              dispatch(setToken(verifiedUser.token));
            }

            // Check roles after setting user
            if (allowedRoles && !checkRoles(verifiedUser, allowedRoles)) {
              router.push('/unauthorized');
              return;
            }

            setAuthChecked(true);
          } else {
            router.push('/landing');
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) {
          removeAuthToken();
          removeCookieToken();
          router.push('/landing');
        }
      }
    };

    verifyAndProtect();

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