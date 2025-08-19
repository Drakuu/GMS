// app/super-admin/layout.jsx
'use client';
import { ROLES } from '@/Routes/constants';
import ProtectedRoute from '../ProtectedRoute';
import SuperAdminSidebar from '@/components/layout/DynamicSidebar';
import Header from '@/components/layout/DynamicNavbar';

export default function SuperAdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
      <div className="flex h-screen overflow-hidden">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <Header />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}