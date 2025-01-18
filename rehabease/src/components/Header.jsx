import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HandHeart } from 'lucide-react';

function Header() {
  const location = useLocation();

  // Simulate login status based on routes for demonstration
  const loggedInRoutes = [
    '/patient/dashboard',
    '/therapist/dashboard',
    '/exercise',
    '/video-tutorials',
    '/appointments',
    '/create-exercise-plan',
    '/patient-progress',
  ];

  // Check if the current route is a logged-in page
  const isLoggedIn = loggedInRoutes.includes(location.pathname);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <HandHeart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">RehabEase</span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8">
            <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-blue-600">Services</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
          </ul>
        </nav>

        {/* Conditional Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/my-account" className="text-gray-600 hover:text-blue-600">My Account</Link>
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                 Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Log In</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
