import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'ghost';
  size?: 'icon' | 'default';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  let baseClass =
    'px-4 py-2 rounded focus:outline-none transition-colors font-medium';
  if (variant === 'outline') {
    baseClass += ' border';
  }
  if (variant === 'ghost') {
    baseClass += ' bg-transparent shadow-none';
  }
  if (size === 'icon') {
    baseClass += ' p-2 w-10 h-10 flex items-center justify-center';
  }
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};