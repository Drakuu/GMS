// app/dashboard/page.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { ROLES } from '@/Routes/constants';

export default function Dashboard() {
   const router = useRouter();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      // If we have a user with a role, redirect to their proper dashboard
      if (user?.user_role) {
         switch (user.user_role) {
            case ROLES.SUPER_ADMIN:
               router.push('/super-admin/dashboard');
               break;
            case ROLES.ADMIN:
               router.push('/admin/dashboard');
               break;
            case ROLES.TRAINER:
               router.push('/trainer/dashboard');
               break;
            case ROLES.MEMBER:
               router.push('/member/dashboard');
               break;
            default:
               // Stay on generic dashboard for unknown roles
               break;
         }
      }
   }, [user, router]);

   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="text-muted-foreground">
               {user ? `Hello, ${user.user_name || user.user_email}!` : 'Loading...'}
            </p>
            {user?.user_role && (
               <p className="mt-2">
                  Role: <span className="font-medium">{user.user_role}</span>
               </p>
            )}
            <p className="mt-4 text-sm text-muted-foreground">
               {user?.user_role ? 'Redirecting to your role-specific dashboard...' : 'Setting up your account...'}
            </p>
         </div>
      </div>
   );
}