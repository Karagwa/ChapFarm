import React from 'react';
import {
  Home,
  Users,
  AlertCircle,
  Truck,
  MessageSquare,
  Bell,
  Activity,
  LogOut,
  BarChart2,
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactElement;
  path?: string;
  children?: { label: string; path: string }[];
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
      { label: 'Admin', path: '/admin/register-admin' },
      { label: 'Officer', path: '/admin/register-officer' },
      { label: 'Transport Provider', path: '/admin/register-transport' },
    ],
  },
  {
    label: 'Farmer Reports',
    icon: <AlertCircle className="w-5 h-5 mr-2" />,
    path: '/admin/farmer-reports',
  },
  {
    label: 'Transport Requests',
    icon: <Truck className="w-5 h-5 mr-2" />,
    path: '/admin/transport-request',
  },
  {
      label: 'Messaging',
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      path: '/admin/messages',
    },
  
  {
    label: 'Users',
    icon: <Users className="w-5 h-5 mr-2" />,
    path: '/admin/users',
  },
  // {
  //   label: 'Activity Logs',
  //   icon: <Activity className="w-5 h-5 mr-2" />,
  //   path: '/admin/activity',
  // },
  // {
  //   label: 'Analytics',
  //   icon: <BarChart2 className="w-5 h-5 mr-2" />,
  //   path: '/admin/analytics',
  // },
  {
    label: 'Logout',
    icon: <LogOut className="w-5 h-5 mr-2" />,
    path: '/',
  },
];

export default menuItems;
