// src/components/ui/calendar.js

import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval } from "date-fns";

// Calendar Component
export const Calendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth,
  });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date) => {
    onDateChange(date);
  };

  return (
    <div className="calendar">
      <div className="calendar-header flex justify-between items-center p-4 bg-blue-500 text-white">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-2 p-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
          <div key={idx} className="text-center font-bold">{day}</div>
        ))}
        {daysInMonth.map((day, idx) => (
          <div
            key={idx}
            className={`text-center py-2 rounded-lg cursor-pointer ${
              selectedDate?.getDate() === day.getDate() ? "bg-blue-200" : "hover:bg-gray-200"
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};
