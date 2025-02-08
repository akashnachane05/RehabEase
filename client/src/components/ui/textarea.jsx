// src/components/ui/Textarea.js

import React from "react";

export const Textarea = ({ label, value, onChange, placeholder, required, rows }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold mb-2">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows || 4}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
