import React from 'react';

// Card Component
export const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children }) => {
  return (
    <div className="font-semibold text-xl mb-2">
      {children}
    </div>
  );
};

// CardContent Component
export const CardContent = ({ children }) => {
  return (
    <div className="text-gray-700">
      {children}
    </div>
  );
};

// CardTitle Component
export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-lg font-medium">{children}</h2>
  );
};

// CardDescription Component
export const CardDescription = ({ children }) => {
  return (
    <p className="text-sm text-gray-500 mt-1">{children}</p>
  );
};

// CardFooter Component
export const CardFooter = ({ children }) => {
  return (
    <div className="border-t mt-4 pt-2 text-right text-gray-600">
      {children}
    </div>
  );
};