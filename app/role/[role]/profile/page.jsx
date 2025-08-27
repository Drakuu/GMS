'use client';
import { useEffect, useState, use } from 'react'; // Add 'use' import
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ROLES } from '@/Routes/constants';
import ProtectedRoute from '@/app/ProtectedRoute';
import ProfileHeader from './components/ProfileHeader';
import ProfileForm from './components/ProfileForm';
import Loading from './loading';
import { apiClient } from '@/utils/apiClient';

export default function ProfilePage({ params }) {
   // Unwrap the params promise with React.use()
   const unwrappedParams = use(params);
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const { user: currentUser } = useSelector((state) => state.auth);
   const router = useRouter();
   const [role, setRole] = useState(null);

   // Handle async params
   useEffect(() => {
      if (unwrappedParams) {
         setRole(unwrappedParams.role); // Use unwrappedParams instead of params
      }
   }, [unwrappedParams]); // Depend on unwrappedParams

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            setLoading(true);

            // Determine which user ID to fetch
            const urlParams = new URLSearchParams(window.location.search);
            const targetUserId = urlParams.get('id') || currentUser?.id;

            if (!targetUserId) {
               throw new Error('User ID not available');
            }

            // Use correct URL format with query parameter
            const response = await apiClient.get(`/users/get-user-by-id?id=${targetUserId}`);

            if (!response.ok) {
               const errorData = await response.json();
               throw new Error(errorData.message || 'Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data.data.user);
         } catch (err) {
            setError(err.message);
            console.error('Error fetching user data:', err);
         } finally {
            setLoading(false);
         }
      };

      if (currentUser && role) {
         fetchUserData();
      }
   }, [currentUser, role]);

   if (!role || loading) {
      return <Loading />;
   }

   if (error) {
      return (
         <div className="container mx-auto p-6">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
               <p>Error: {error}</p>
               <button
                  onClick={() => router.back()}
                  className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded"
               >
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   if (!userData) {
      return (
         <div className="container mx-auto p-6">
            <p>User not found</p>
         </div>
      );
   }

   return (
      <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TRAINER, ROLES.MEMBER]}>
         <div className="container mx-auto p-6 max-w-4xl">
            <ProfileHeader user={userData} currentUser={currentUser} />
            <ProfileForm user={userData} currentUser={currentUser} />
         </div>
      </ProtectedRoute>
   );
}