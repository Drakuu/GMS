'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
  if (!loading) {
    console.log('ProtectedRoute check - token:', token, 'role:', user?.user_role);
    
    if (!token) {
      console.log('No token, redirecting to login');
      router.push('/login');
    } 
    else if (allowedRoles && !allowedRoles.includes(user?.user_role)) {
      console.log('Role not allowed, redirecting to unauthorized');
      router.push('/unauthorized');
    }
  }
}, [token, user, allowedRoles, router, loading]);

  useEffect(() => {
    if (!loading) { // Wait until auth state is loaded
      if (!token) {
        router.push('/login');
      } else if (allowedRoles && !allowedRoles.includes(user?.user_role)) {
        router.push('/unauthorized');
      }
      setIsChecking(false);
    }
  }, [token, user, allowedRoles, router, loading]);

  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!token || (allowedRoles && !allowedRoles.includes(user?.user_role))) {
    return null;
  }

  return children;
}