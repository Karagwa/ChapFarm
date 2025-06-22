import React from 'react';
import {
  Home,
  Users,
  LogOut,
  Shield,
  UserCheck,
  Truck,
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path?: string;
  children?: {
    label: string;
    path: string;
    icon?: React.ReactElement;
    badge?: string;
    color?: string;
    badgeColor?: string;
    isNew?: boolean;
  }[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="w-5 h-5 mr-2" />,
    path: '/admin',
  },
  {
    label: 'Register',
    icon: <Users className="w-5 h-5 mr-2" />,
    children: [
      {
        label: 'Admin',
        path: '/admin/register-admin',
        icon: <Shield className="w-4 h-4 mr-2" />,
        color: 'text-purple-200',
        //badge: 'Super',
        badgeColor: 'bg-purple-500 bg-opacity-80 text-white',
      },
      {
        label: 'Officer',
        path: '/admin/register-officer',
        icon: <UserCheck className="w-4 h-4 mr-2" />,
        color: 'text-blue-200',
        //badge: 'Auth',
        badgeColor: 'bg-blue-500 bg-opacity-80 text-white',
      },
      {
        label: 'Transport Provider',
        path: '/admin/register-transport',
        icon: <Truck className="w-4 h-4 mr-2" />,
        color: 'text-green-200',
        //badge: 'Service',
        badgeColor: 'bg-green-500 bg-opacity-80 text-white',
      },
    ],
  },
  {
    label: 'Users',
    icon: <Users className="w-5 h-5 mr-2" />,
    path: '/admin/users',
  },
  {
    label: 'Logout',
    icon: <LogOut className="w-5 h-5 mr-2" />,
    path: '/',
  },
];

export default menuItems;
