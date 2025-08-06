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
            name: 'Members',
            path: '/super-admin/members',
            icon: <Users size={18} />,
          },
          {
            name: 'Trainers',
            path: '/super-admin/trainers',
            icon: <User size={18} />,
          },
          {
            name: 'Classes',
            path: '/super-admin/classes',
            icon: <Clipboard size={18} />,
          },
          {
            name: 'Equipment',
            path: '/super-admin/equipment',
            icon: <Dumbbell size={18} />,
          },
        ],
      },
      {
        title: 'Management',
        items: [
          {
            name: 'Billing',
            path: '/super-admin/billing',
            icon: <CreditCard size={18} />,
          },
          {
            name: 'Reports',
            path: '/super-admin/reports',
            icon: <FileText size={18} />,
          },
          {
            name: 'Competitions',
            path: '/super-admin/competitions',
            icon: <Trophy size={18} />,
          },
          {
            name: 'Health Tracking',
            path: '/super-admin/health-tracking',
            icon: <Activity size={18} />,
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
