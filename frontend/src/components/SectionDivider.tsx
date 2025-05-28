import React from 'react';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = "" }) => {
  return (
    <div className={`relative h-8 ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2">
        <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 8L20 0L40 8L20 16L0 8Z" fill="#72AA3A" />
        </svg>
      </div>
      <div className="absolute inset-x-0 h-px bg-gray-200 top-1/2" />
    </div>
  );
};

export default SectionDivider;