// app/role/[role]/profile/components/ProfileForm.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';

export default function ProfileForm({ user, currentUser }) {
   const [formData, setFormData] = useState({
      user_name: user.user_name || '',
      user_phone: user.user_phone || '',
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   const { token } = useSelector((state) => state.auth);
   const router = useRouter();

   const isOwnProfile = currentUser?.id === user._id || currentUser?._id === user._id;
   const canEdit = isOwnProfile || ['SuperAdmin', 'Admin'].includes(currentUser?.user_role);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!canEdit) return;

      try {
         setLoading(true);
         setError('');
         setSuccess('');

         const response = await fetch(`/api/users/update-user?id=${user._id}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Failed to update profile');
         }

         setSuccess('Profile updated successfully');
         // Refresh the page to show updated data
         setTimeout(() => router.refresh(), 1000);
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   if (!canEdit) {
      return (
         <Card>
            <CardContent className="p-6">
               <p className="text-muted-foreground">You don't have permission to edit this profile.</p>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
               {isOwnProfile ? 'Update your profile information' : `Edit ${user.user_name}'s profile`}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
               {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md">
                     {error}
                  </div>
               )}

               {success && (
                  <div className="bg-green-100 text-green-800 p-3 rounded-md">
                     {success}
                  </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="user_name">Full Name</Label>
                     <Input
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="user_email">Email</Label>
                     <Input
                        id="user_email"
                        type="email"
                        value={user.user_email}
                        disabled
                        className="opacity-70"
                     />
                     <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="user_phone">Phone Number</Label>
                  <Input
                     id="user_phone"
                     name="user_phone"
                     value={formData.user_phone}
                     onChange={handleChange}
                     placeholder="Enter phone number"
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="user_role">Role</Label>
                  <Input
                     id="user_role"
                     value={user.user_role}
                     disabled
                     className="opacity-70"
                  />
                  <p className="text-xs text-muted-foreground">Role cannot be changed from here</p>
               </div>

               <Button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
               </Button>
            </form>
         </CardContent>
      </Card>
   );
}