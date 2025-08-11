'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Get token directly from localStorage for the check
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
      
      console.log('ProtectedRoute check - token:', token, 'role:', user?.user_role);
      
      if (!token) {
        console.log('No token, redirecting to login');
        router.push('/login');
      } 
      else if (allowedRoles && !allowedRoles.includes(user?.user_role)) {
        console.log('Role not allowed, redirecting to unauthorized');
        router.push('/unauthorized');
      }
      setIsChecking(false);
    }
  }, [user, allowedRoles, router, loading]);

  if (loading || isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Final check using localStorage directly
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
  if (!token || (allowedRoles && !allowedRoles.includes(user?.user_role))) {
    return null;
  }

  return children;
}