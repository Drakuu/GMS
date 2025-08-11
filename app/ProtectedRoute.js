'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (allowedRoles && !allowedRoles.includes(user?.user_role)) {
      router.push('/unauthorized');
    }
  }, [token, user, allowedRoles, router]);

  if (!token || (allowedRoles && !allowedRoles.includes(user?.user_role))) {
    return null; // or return a loading spinner
  }

  return children;
}