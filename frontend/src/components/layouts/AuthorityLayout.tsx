import React from 'react';
import AuthoritySidebar from '../AuthoritySidebar';


interface AuthorityLayoutProps {
  children: React.ReactNode;
}

const AuthorityLayout: React.FC<AuthorityLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AuthoritySidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AuthorityLayout;
