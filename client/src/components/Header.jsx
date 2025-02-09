import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';

function Header() {
  const location = useLocation();

  // Define routes for roles
  const patientRoutes = [
    '/patient/dashboard',
    '/exercise',
    '/video-tutorials',
    '/appointments',
    '/patient-progress',
    '/patients/profile',
    '/patient/therapist',
    '/request',
    '/recommend'
  ];
  const therapistRoutes = [
    '/therapist/dashboard',
    '/create-exercise-plan',
    '/patient-progress',
    '/therapist/profile',
    '/therapist/patients'
  ];

  // Determine the role based on the current route
  const isPatient = patientRoutes.includes(location.pathname);
  const isTherapist = therapistRoutes.includes(location.pathname);
  const isLoggedIn = isPatient || isTherapist;

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 border-b bg-white shadow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link  className="flex items-center space-x-2">
          <HandHeart className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">RehabEase</span>
        </Link>

        {/* Conditional Buttons */}
        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              {isPatient && (
                <Link to="/patients/profile" className="text-gray-600 hover:text-blue-600 transition duration-300">
                  My Account (Patient)
                </Link>
              )}
              {isTherapist && (
                <Link to="/therapist/profile" className="text-gray-600 hover:text-blue-600 transition duration-300">
                  My Account (Therapist)
                </Link>
              )}
              <motion.button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log Out
              </motion.button>
            </>
          ) : (
            <>
              {/* Log In Dropdown */}
              <div className="relative group">
                <motion.button 
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Log In
                </motion.button>
                <div className="absolute hidden group-hover:block mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-300"
                  >
                    Patient
                  </Link>
                  <Link
                    to="/therapist/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-300"
                  >
                    Therapist
                  </Link>
                </div>
              </div>

              {/* Sign Up Dropdown */}
              <div className="relative group">
                <motion.button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
                <div className="absolute hidden group-hover:block mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-300"
                  >
                     Patient
                  </Link>
                  <Link
                    to="/therapist/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-300"
                  >
                    Therapist
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
