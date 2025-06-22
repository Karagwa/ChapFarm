import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import menuItems from './menuItems';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <aside className="w-64 bg-chapfarm-700 text-white flex flex-col p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">ChapFarm Admin</h1>
      {menuItems.map((item, idx) => (
        <div key={idx} className="w-full">
          {!item.children ? (
            <Link
              to={item.path || '#'}
              className="flex items-center text-sm font-medium hover:bg-chapfarm-600 rounded px-3 py-2 transition"
            >
              {item.icon}
              {item.label}
            </Link>
          ) : (
            <div>
              <button
                className="flex justify-between items-center w-full text-sm font-medium hover:bg-chapfarm-600 rounded px-3 py-2 transition"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>
                {openDropdown === item.label ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openDropdown === item.label && (
                <div className="mt-2 space-y-1">
                  {item.children.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      to={sub.path}
                      className={`flex items-center justify-between px-6 py-2 text-sm rounded hover:bg-chapfarm-600 transition group ${
                        sub.color || 'text-white'
                      }`}
                    >
                      <div className="flex items-center">
                        {sub.icon && (
                          <span className="opacity-80 group-hover:opacity-100">
                            {sub.icon}
                          </span>
                        )}
                        <span className="font-medium">{sub.label}</span>
                        {sub.isNew && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            New
                          </span>
                        )}
                      </div>

                      {sub.badge && (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            sub.badgeColor || 'bg-white bg-opacity-20 text-white'
                          }`}
                        >
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
