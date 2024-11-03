import React from "react";

export default function ShiftCard({ date, title, time, location, role }) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md mb-4">
      <h4 className="text-sm font-medium text-gray-600">{date}</h4>
      <h3 className="text-md font-medium">{title}</h3>
      <div className="text-sm text-gray-500 mt-2">
        <p className="mr-2">🕒 {time}</p>
        <p className="mr-2">📍 {location}</p>
        <p>👤 {role}</p>
      </div>
    </div>
  );
}
