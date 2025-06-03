import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import menuItems from './menuItems';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <aside className="w-64 bg-chapfarm-700 text-white flex flex-col p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">ChapFarm Admin</h1>
      {menuItems.map((item, idx) => (
        <div key={idx} className="w-full">
          {!item.children ? (
            <a
              href={item.path}
              className="flex items-center text-sm font-medium hover:bg-chapfarm-600 rounded px-3 py-2 transition"
            >
              {item.icon}
              {item.label}
            </a>
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
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((sub, subIdx) => (
                    <a
                      key={subIdx}
                      href={sub.path}
                      className="block text-sm hover:underline text-white/80"
                    >
                      • {sub.label}
                    </a>
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
