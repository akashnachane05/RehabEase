// src/components/ui/Input.js

import React from "react";

export const Input = ({ label, type, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold mb-2">{label}</label>}
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
