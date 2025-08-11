'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { verifyAuth } from '@/lib/authUtils';
import { initializeAuth } from '@/store/slices/authSlice';
import Loading from './loading';
import { unauthorized } from 'next/navigation'

export default function ProtectedRoute({ children, allowedRoles }) {
  const [isChecking, setIsChecking] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      dispatch(initializeAuth());

      const { isValid, user } = await verifyAuth();

      if (!isValid) {
        router.push('/login');
        return;
      }

      if (allowedRoles && !allowedRoles.includes(user?.user_role)) {
        router.push(unauthorized());
        return;
      }

      setIsChecking(false);
    };

    checkAuthentication();
  }, [dispatch, router, allowedRoles]);

  if (isChecking) {
    return <Loading />;
  }

  return children;
}