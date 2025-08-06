// app/page.js
'use client';
import { useSelector } from 'react-redux';
import { ROLES } from '@/lib/constants';
import SuperAdminLayout from './super-admin/layout';
import AdminLayout from './admin/layout';
import UserLayout from './user/layout';
import AuthLayout from '@/app/(auth)/layout';
import LandingPage from './landing/page';

// Temporary hardcoded role - change this to test different layouts
// Change to ROLES.ADMIN or ROLES.USER to test others
const CURRENT_ROLE = null;

export default function RoleBasedLayout({ children }) {
  switch (CURRENT_ROLE) {
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
