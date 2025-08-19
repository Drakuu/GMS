'use client';
import { useSelector } from 'react-redux';
import { ROLES } from '@/lib/constants';
import { checkTokenPersistence } from '@/lib/authUtils';
import SuperAdminLayout from './super-admin/layout';
import AdminLayout from './admin/layout';
import AuthLayout from '@/app/(auth)/layout';
import LandingPage from './landing/page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from "@/app/loading"

export default function RoleBasedLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const tokenPersisted = checkTokenPersistence();
    if (!tokenPersisted) {
      router.push('/landing');
    }
  }, [router]);

  if (!checkTokenPersistence()) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  // Wait for user data to load
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  switch (user.user_role) {
    case ROLES.SUPER_ADMIN:
      return <SuperAdminLayout>{children}</SuperAdminLayout>;
    case ROLES.ADMIN:
      return <AdminLayout>{children}</AdminLayout>;
    default:
      return <LandingPage>{children}</LandingPage>;
  }
}