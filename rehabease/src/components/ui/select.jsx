// src/components/ui/select.js

import React, { useState } from "react";

// Select Component
export const Select = ({ children }) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

// SelectTrigger Component
export const SelectTrigger = ({ children }) => {
  return (
    <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-lg focus:outline-none">
      {children}
    </button>
  );
};

// SelectContent Component
export const SelectContent = ({ children }) => {
  return (
    <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10">
      {children}
    </div>
  );
};

// SelectItem Component
export const SelectItem = ({ children, onClick }) => {
  return (
    <button
      className="block px-4 py-2 w-full text-left hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// SelectValue Component
export const SelectValue = ({ value }) => {
  return (
    <span className="text-gray-700">
      {value}
    </span>
  );
};
