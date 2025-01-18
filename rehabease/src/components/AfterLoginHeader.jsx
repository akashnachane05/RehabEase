import React from 'react';
import { Link } from 'react-router-dom';
import { HandHeart } from 'lucide-react';

function Header() {
  return (
    <header className="border-b bg-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <HandHeart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">RehabEase</span>
        </Link>
        
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            </li>
            <li>
              <Link to="/appointments" className="text-gray-600 hover:text-blue-600">Appointments</Link>
            </li>
            <li>
              <Link to="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
            </li>
          </ul>
        </nav>

        {/* Profile & Logout Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Link */}
          <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <img
              src="/path/to/default-avatar.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>John Doe</span>
          </Link>
          
          {/* Logout Button */}
          <Link
            to="/logout"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
