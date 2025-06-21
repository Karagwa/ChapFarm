import React from 'react';
import TransportSidebar from '../TransportSidebar';


interface TransportLayoutProps {
  children: React.ReactNode;
}

const TransportLayout: React.FC<TransportLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <TransportSidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default TransportLayout;
