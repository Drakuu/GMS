import { LayoutDashboard, Users, Settings, User } from 'lucide-react';
import { ROLES } from './constants'

export const SIDEBAR_ROUTES = {
  [ROLES.SUPER_ADMIN]: [
    {
      name: 'Dashboard',
      path: '/super-admin/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: 'User Management',
      path: '/super-admin/users',
      icon: <Users size={18} />,
      children: [
        { name: 'Admins', path: '/super-admin/users/admins' },
        { name: 'Customers', path: '/super-admin/users/customers' }
      ]
    }
  ],
  [ROLES.ADMIN]: [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
    }
  ],
  [ROLES.USER]: [
    {
      name: 'Dashboard',
      path: '/user/dashboard',
      icon: <LayoutDashboard size={18} />,
    }
  ]
};