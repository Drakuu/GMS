// app/ProtectedRoute.js
'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { verifyAuth, checkRoles } from '@/lib/authUtils';
import { setToken, setUser } from '@/store/slices/authSlice';
import Loading from './loading';
import { unauthorized } from 'next/navigation'

export default function ProtectedRoute({ children, allowedRoles }) {
  const [authChecked, setAuthChecked] = useState(false);
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const verifyAndProtect = async () => {
      try {
        // Check existing auth state first
        if (!token && !isAuthenticated) {
          const { isValid, user: verifiedUser } = await verifyAuth();

          if (isMounted) {
            if (isValid && verifiedUser) {
              dispatch(setUser(verifiedUser));
              if (verifiedUser.token) {
                dispatch(setToken(verifiedUser.token));
              }
            } else {
              router.push('/login');
              return;
            }
          }
        }

        // Check roles if specified
        if (allowedRoles && !checkRoles(user || {}, allowedRoles)) {
          router.push(unauthorized());
          return;
        }

        if (isMounted) {
          setAuthChecked(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        if (isMounted) {
          router.push('/login');
        }
      }
    };

    verifyAndProtect();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router, allowedRoles, token, isAuthenticated, user]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return children;
}