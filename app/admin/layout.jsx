// app/admin/layout.jsx
'use client';
import { ROLES } from '@/lib/constants';
import ProtectedRoute from '../ProtectedRoute';
import AdminSidebar from '@/components/layout/DynamicSidebar';
import Header from '@/components/layout/DynamicNavbar';

export default function AdminLayout({ children }) {

  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <Header role="admin" />
          <main className="flex-1 p-4 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}