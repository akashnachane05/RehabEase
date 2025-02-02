// src/components/ui/progress.jsx
import React from 'react';

export const Progress = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${percentage}%`, height: '20px', backgroundColor: 'green' }}
      ></div>
    </div>
  );
};
