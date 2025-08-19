// app/super-admin/layout.jsx
'use client';
import { ROLES } from '@/lib/constants';
import ProtectedRoute from '../ProtectedRoute';
import SuperAdminSidebar from '@/components/layout/DynamicSidebar';
import Header from '@/components/layout/DynamicNavbar';

export default function SuperAdminLayout({ children }) {
  return (
    <ProtectedRoute >
      <div className="flex h-screen overflow-hidden">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col overflow-auto">
          <Header role="super-admin" />
          <main className="flex-1 p-4 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}