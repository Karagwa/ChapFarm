// src/components/AuthoritySidebar.tsx
import React from 'react';
import { CheckCircle, AlertTriangle, MessageSquare, LogOut, Bell, Truck, AlertCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const authorityMenu = [
  { label: 'Dashboard', icon: <CheckCircle className="w-5 h-5 mr-2" />, path: '/authority' },
  
   {
    label: 'Farmer Reports',
    icon: <AlertCircle className="w-5 h-5 mr-2" />,
    path: '/authority/farmer-reports',
  },
  
  // {
  //   label: 'Messaging',
  //   icon: <MessageSquare className="w-5 h-5 mr-2" />,
  //   path: '/authority/messages',
  // },
  {
    label: 'Alerts',
    icon: <Bell className="w-5 h-5 mr-2" />,
    path: '/authority/alerts',
  },
  
  { label: 'Logout', icon: <LogOut className="w-5 h-5 mr-2" />, path: '/' },
];

const AuthoritySidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-chapfarm-700 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">ChapFarm Officer</h2>
      <div className="bg-green-50 text-green-800 p-4 rounded mb-6 bg-opacity-20">
        <p className="text-sm font-semibold">Authority Officer</p>
        <p className="text-xs text-white/80">Agricultural Dept.</p>
      </div>

      <nav className="space-y-2">
        {authorityMenu.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === item.path
                ? 'bg-white text-chapfarm-700'
                : 'hover:bg-chapfarm-600 text-white/90'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AuthoritySidebar;
