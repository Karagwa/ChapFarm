import React from 'react';
import { Link } from 'react-router-dom';
import { ChapFarmLogo } from './ChapFarmLogo';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <ChapFarmLogo />
        </Link>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-chapfarm-700 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-chapfarm-700 font-medium">
  About
</Link>
          <Link to="/services" className="text-gray-700 hover:text-chapfarm-700 font-medium">Services</Link>
          <Link to="/contact" className="text-gray-700 hover:text-chapfarm-700 font-medium">Contact</Link>
          <Link to="/admin" className="text-gray-700 hover:text-chapfarm-700 font-medium">Admin</Link>
          <Link to="/authority" className="text-gray-700 hover:text-chapfarm-700 font-medium">Authority</Link>
          <Link to="/transport" className="text-gray-700 hover:text-chapfarm-700 font-medium">Transport</Link>
          <Link to="/login">
            <Button variant="outline" className="border-chapfarm-600 text-chapfarm-700 hover:bg-chapfarm-50">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-chapfarm-700 hover:bg-chapfarm-800">Register</Button>
          </Link>
          
        </div>
        
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;