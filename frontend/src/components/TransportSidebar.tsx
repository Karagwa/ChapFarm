// src/components/AuthoritySidebar.tsx
import React from 'react';
import { CheckCircle, AlertTriangle, MessageSquare, LogOut, Bell, Truck, AlertCircle, ClipboardList, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TransportMenu = [
 
   { label: 'Dashboard', icon: <Truck className="w-5 h-5 mr-2" />, path: '/transport' },
  { label: 'Requests', icon: <ClipboardList className="w-5 h-5 mr-2" />, path: '/transport/requests' },
  { label: 'History', icon: <Clock className="w-5 h-5 mr-2" />, path: '/transport/history' },
  { label: 'Logout', icon: <LogOut className="w-5 h-5 mr-2" />, path: '/' },
  
];

const TransportSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-chapfarm-700 text-white p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-6">ChapFarm Officer</h2>
      <div className="bg-green-50 text-green-800 p-4 rounded mb-6 bg-opacity-20">
        <p className="text-sm font-semibold">Transport Provider</p>
        <p className="text-xs text-white/80">Provide Transport services</p>
      </div>

      <nav className="space-y-2">
        {TransportMenu.map((item, idx) => (
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

export default TransportSidebar;
