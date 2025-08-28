// app/role/[role]/profile/components/ProfileHeader.jsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function ProfileHeader({ user, currentUser }) {
   const isOwnProfile = currentUser?.id === user._id || currentUser?._id === user._id;

   return (
      <div className="flex items-center gap-6 mb-8 p-6 bg-card rounded-lg shadow-sm">
         <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar || '/avatars/default.png'} />
            <AvatarFallback className="text-2xl bg-muted">
               {user.user_name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
         </Avatar>

         <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
               <h1 className="text-3xl font-bold">{user.user_name || 'User'}</h1>
               <Badge variant={user.user_role === 'SuperAdmin' ? 'default' : 'secondary'}>
                  {user.user_role}
               </Badge>
               {isOwnProfile && <Badge variant="outline">Your Profile</Badge>}
            </div>

            <p className="text-muted-foreground mb-2">{user.user_email}</p>

            {user.user_phone && (
               <p className="text-muted-foreground">{user.user_phone}</p>
            )}
         </div>
      </div>
   );
}