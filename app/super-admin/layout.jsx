// app/super-admin/layout.jsx
'use client';
import SuperAdminSidebar from '@/components/layout/SuperAdminSidebar';
import Header from '@/components/layout/Header';

export default function SuperAdminLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header role="super-admin" />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}