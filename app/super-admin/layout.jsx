// app/super-admin/layout.jsx
'use client';
import { ROLES } from '@/lib/constants';
import ProtectedRoute from '../ProtectedRoute';
import DynamicSidebar from '@/components/layout/DynamicSidebar';
import DynamicNavbar from '@/components/layout/DynamicNavbar';

export default function SuperAdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
      <div className="flex h-screen overflow-hidden">
        <DynamicSidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <DynamicNavbar />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}