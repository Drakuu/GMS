// // components/layout/Header.jsx
// 'use client';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import {
//   Bell,
//   Menu,
//   Search,
//   User,
//   ChevronDown,
//   LogOut,
//   Settings,
//   LifeBuoy
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
// import { ROLES } from '@/lib/constants';

// export default function Header() {
//   const pathname = usePathname();
//   const { user, role } = useSelector(state => state.auth);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const getHeaderTitle = () => {
//     if (pathname.includes('super-admin')) return 'Super Admin Dashboard';
//     if (pathname.includes('admin')) return 'Admin Dashboard';
//     if (pathname.includes('user')) return 'User Dashboard';
//     return 'Dashboard';
//   };

//   return (
//     <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between px-4">
//         {/* Left side - Mobile menu and title */}
//         <div className="flex items-center gap-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="h-5 w-5" />
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//           <h1 className="text-lg font-semibold">{getHeaderTitle()}</h1>
//         </div>

//         {/* Middle - Search (desktop only) */}
//         <div className="hidden md:flex flex-1 max-w-md mx-4">
//           <div className="relative w-full">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-full pl-10"
//             />
//           </div>
//         </div>

//         {/* Right side - User controls */}
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <Bell className="h-5 w-5" />
//             <span className="sr-only">Notifications</span>
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 px-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
//                     <User className="h-4 w-4 text-primary" />
//                   </div>
//                   <div className="hidden md:flex flex-col items-start">
//                     <span className="text-sm font-medium">
//                       {user?.name || 'User'}
//                     </span>
//                     <span className="text-xs text-muted-foreground">
//                       {role ? ROLES[role.toUpperCase()] : 'Guest'}
//                     </span>
//                   </div>
//                 </div>
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <LifeBuoy className="mr-2 h-4 w-4" />
//                 <span>Support</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem className="text-destructive focus:text-destructive">
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }

// components/Header.jsx
'use client';
import Link from 'next/link';
import { MessageSquare, Bell, Search, User } from 'lucide-react';

export default function Header({ role }) {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          {role === 'super-admin' && ''}
          {role === 'admin' && 'Admin Dashboard'}
          {role === 'user' && 'User Dashboard'}
        </div>
        <nav className="flex items-center justify-between gap-4 w-full">
          {/* Search bar on the left */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search members, classes"
                className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right-aligned icons and user menu */}
          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="p-1 text-gray-800 hover:text-red-600 transition-colors">
              <Bell size={18} />
            </button>

            {/* Messages */}
            <button className="p-1 text-gray-800 hover:text-red-600 transition-colors">
              <MessageSquare size={18} />
            </button>
            {/* Logout button */}
            <Link
              href="/logout"
              className="text-red-600 text-xs font-semibold hover:underline"
            >
              <span className="bg-red-50 px-2 py-1 rounded-full hover:bg-red-100 transition-colors">
                Logout
              </span>
            </Link>

            {/* User avatar/icon */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 hidden md:inline">
                John
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
