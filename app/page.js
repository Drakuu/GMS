// app/page.js
'use client';
import { useSelector } from 'react-redux';
import { ROLES } from '@/lib/constants';
import SuperAdminLayout from './super-admin/layout';
import AdminLayout from './admin/layout';
import UserLayout from './user/layout';
import AuthLayout from '@/app/(auth)/layout';
import LandingPage from './landing/page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleBasedLayout({ children }) {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  switch (user?.user_role) {
    case ROLES.SUPER_ADMIN:
      return <SuperAdminLayout>{children}</SuperAdminLayout>;
    case ROLES.ADMIN:
      return <AdminLayout>{children}</AdminLayout>;
    case ROLES.USER:
      return <UserLayout>{children}</UserLayout>;
    default:
      return <LandingPage>{children}</LandingPage>;
  }
}