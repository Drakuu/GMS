import {
  LayoutDashboard,
  Users,
  User,
  Clipboard,
  CreditCard,
  FileText,
  Trophy,
  Activity,
  Settings,
  HelpCircle,
  Dumbbell,
} from 'lucide-react';
import { ROLES } from './constants';

export const SIDEBAR_ROUTES = {
  [ROLES.SUPER_ADMIN]: {
    mainSections: [
      {
        title: 'Main Menu',
        items: [
          {
            name: 'Dashboard',
            path: '/super-admin/dashboard',
            icon: <LayoutDashboard size={18} />,
          },
          {
            name: 'Suscription and Billing',
            path: '/super-admin/suscription-and-billing',
            icon: <CreditCard size={18} />,
          },
          {
            name: 'Reports',
            path: '/super-admin/reports',
            icon: <FileText size={18} />,
          },
        ],
      },
      {
        title: 'Management',
        items: [
          {
            name: 'Company Management',
            path: '/super-admin/company-management',
            icon: <Users size={18} />,
          },
          {
            name: 'User Management',
            path: '/super-admin/user-management',
            icon: <User size={18} />,
          },

          {
            name: 'Modules Management',
            path: '/super-admin/modules-management',
            icon: <Dumbbell size={18} />,
          },
        ],
      },
    ],
    bottomSection: {
      items: [
        {
          name: 'Settings',
          path: '/super-admin/settings',
          icon: <Settings size={18} />,
        },
        {
          name: 'Help & Support',
          path: '/super-admin/help-support',
          icon: <HelpCircle size={18} />,
        },
      ],
    },
  },

  [ROLES.ADMIN]: {
    mainSections: [
      {
        title: 'Main Menu',
        items: [
          {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: <LayoutDashboard size={18} />,
          },
          {
            name: 'Members',
            path: '/admin/members',
            icon: <Users size={18} />,
          },
          {
            name: 'Trainers',
            path: '/admin/trainers',
            icon: <User size={18} />,
          },
          {
            name: 'Classes',
            path: '/admin/classes',
            icon: <Clipboard size={18} />,
          },
          {
            name: 'Equipment',
            path: '/admin/equipment',
            icon: <Dumbbell size={18} />,
          },
        ],
      },
      {
        title: 'Management',
        items: [
          {
            name: 'Billing',
            path: '/admin/billing',
            icon: <CreditCard size={18} />,
          },
          {
            name: 'Reports',
            path: '/admin/reports',
            icon: <FileText size={18} />,
          },
          {
            name: 'Competitions',
            path: '/admin/competitions',
            icon: <Trophy size={18} />,
          },
          {
            name: 'Health Tracking',
            path: '/admin/health-tracking',
            icon: <Activity size={18} />,
          },
        ],
      },
    ],
    bottomSection: {
      items: [
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: <Settings size={18} />,
        },
        {
          name: 'Help & Support',
          path: '/admin/help-support',
          icon: <HelpCircle size={18} />,
        },
      ],
    },
  },
  [ROLES.USER]: {
    mainSections: [
      {
        title: 'Main Menu',
        items: [
          {
            name: 'Dashboard',
            path: '/user/dashboard',
            icon: <LayoutDashboard size={18} />,
          },
          {
            name: 'Membership Plans',
            path: '/user/membership-plans',
            icon: <Users size={18} />,
          },
          {
            name: 'Trainers',
            path: '/user/trainers',
            icon: <User size={18} />,
          },
          {
            name: 'Classes',
            path: '/user/classes',
            icon: <Clipboard size={18} />,
          },
          {
            name: 'Equipment',
            path: '/user/equipment',
            icon: <Dumbbell size={18} />,
          },
        ],
      },
      {
        title: 'Management',
        items: [
          {
            name: 'Billing',
            path: '/user/billing',
            icon: <CreditCard size={18} />,
          },
          {
            name: 'Competitions',
            path: '/user/competitions',
            icon: <Trophy size={18} />,
          },
          {
            name: 'Health Tracking',
            path: '/user/health-tracking',
            icon: <Activity size={18} />,
          },
        ],
      },
    ],
    bottomSection: {
      items: [
        {
          name: 'Settings',
          path: '/user/settings',
          icon: <Settings size={18} />,
        },
        {
          name: 'Help & Support',
          path: '/user/help-support',
          icon: <HelpCircle size={18} />,
        },
      ],
    },
  },
};
