import React from 'react';

export const ChapFarmLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width="36" 
        height="36" 
        viewBox="0 0 36 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path 
          d="M18 3.5C10 3.5 3.5 10 3.5 18C3.5 26 10 32.5 18 32.5C26 32.5 32.5 26 32.5 18C32.5 10 26 3.5 18 3.5Z" 
          fill="#72AA3A" 
          stroke="#446923" 
          strokeWidth="2"
        />
        <path 
          d="M12 18C12 14 14 10 18 10C22 10 24 14 24 18" 
          stroke="#446923" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <path 
          d="M12 26C12 22 14 18 18 18C22 18 24 22 24 26" 
          stroke="#FFFFFF" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold text-xl">ChapFarm</span>
    </div>
  );
};