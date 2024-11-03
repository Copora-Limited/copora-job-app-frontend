import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import styles

const localizer = momentLocalizer(moment); // Set up the localizer with moment.js

const events = [
  {
    start: new Date(2024, 10, 3, 11, 30), // Month is 0-indexed (Nov)
    end: new Date(2024, 10, 3, 12, 0),
    title: "Wales Restaurant - Wales offshore Chef",
  },
  // Add more events as needed
];

export default function CalendarComponent() {
  const [date, setDate] = useState(new Date()); // Set initial date state

  // Custom toolbar component
  const CustomToolbar = ({ date, label }) => {
    return (
      <div className="my-custom-toolbar text-center mb-2">
        {/* <span className="text-sm ">{label}</span>{" "} */}
      </div>
    );
  };

  return (
    <div className="w-full bg-white p-2 rounded-lg shadow-md">
      <h3 className="text-sm mb-2">Today's Shift</h3>
      <div className="bg-blue-50 p-2 rounded mb-4 border-l-4 border-blue-900">
        <p className="text-xs text-gray-500 font-medium">
          11:30 - 12:00 (30 min)
        </p>
        <p className="text-xs">Wales Restaurant - Wales offshore Chef</p>
        <p className="text-xs text-gray-500">Wales, UK</p>
      </div>

      <h3 className="text-xs font-normal mb-2">
        Selected Date: {date.toDateString()}
      </h3>
      {/* calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 250 }}
        onSelectEvent={(event) => alert(event.title)} // Handle event selection
        onNavigate={(date) => setDate(date)} // Handle date navigation
        views={["month"]} // Specify available views
        defaultView="month"
        components={{
          toolbar: CustomToolbar, // Set the custom toolbar
        }}
        dayFormat="dd" // Set the day format to short (Mo, Tu, etc.)
        formats={{
          dayFormat: "dd", // Custom format for day labels
          weekdayFormat: "dd", // Custom format for week days
        }}
      />
    </div>
  );
}
