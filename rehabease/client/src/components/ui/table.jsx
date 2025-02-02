// src/components/ui/table.js

import React from "react";

// Table Component
export const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">{children}</table>
    </div>
  );
};

// TableBody Component
export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

// TableCell Component
export const TableCell = ({ children }) => {
  return (
    <td className="px-4 py-2 border-t border-gray-300 text-sm text-gray-700">
      {children}
    </td>
  );
};

// TableHead Component
export const TableHead = ({ children }) => {
  return <thead>{children}</thead>;
};

// TableHeader Component
export const TableHeader = ({ children }) => {
  return (
    <th className="px-4 py-2 bg-gray-200 text-sm text-gray-700 border-b border-gray-300">
      {children}
    </th>
  );
};

// TableRow Component
export const TableRow = ({ children }) => {
  return <tr>{children}</tr>;
};
