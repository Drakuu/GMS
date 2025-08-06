'use client';
import SuperAdminSidebar from '@/components/layout/DynamicSidebar';
import Header from '@/components/layout/Header';

export default function SuperAdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1">
        <Header role="admin" />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
