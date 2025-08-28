'use client';
import Link from 'next/link';
import { MessageSquare, Bell, Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation'; // Add usePathname
import { logoutUser } from '@/store/slices/authSlice';
import Loading from '@/app/loading';

export default function DynamicNavbar({ role }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Extract role from URL path if not provided as prop
  const pathRole = pathname?.split('/')[1]; // Gets 'admin' from '/admin/dashboard'

  const userRole = user?.user_role?.toLowerCase() || role?.toLowerCase() || pathRole || '';
  // console.log('the role is ', userRole)
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser()); // Dispatch the sync action
    router.push('/landing');
  };

  if (!userRole ) {
    return <Loading />;
  }

  const dashboardTitles = {
    'super-admin': 'Super Admin Dashboard',
    'admin': 'Admin Dashboard',
    "member": "Member's Dashboard",
    "trainer": "Trainer's Dashboard",
  };

  return (
    <header className="bg-background border-b p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          {dashboardTitles[userRole] || 'Dashboard'}
        </div>

        <nav className="flex items-center justify-between gap-4 w-full">
          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search members, classes"
                className="pl-8 w-full"
              />
            </div>
          </div>

          {/* Right-aligned icons and user menu */}
          <div className="flex items-center gap-4">
            {/* Notification with badge */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} className="text-muted-foreground" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0">3</Badge>
            </Button>

            {/* Messages with badge */}
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare size={18} className="text-muted-foreground" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0">1</Badge>
            </Button>

            {/* User dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/default.png" />
                    <AvatarFallback className="bg-muted">
                      {user?.user_name?.charAt(0) || <User size={16} />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">
                    {user?.user_name || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/role/${userRole}/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/role/${userRole}/setting`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}