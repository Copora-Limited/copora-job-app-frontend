import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import styles
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed

const localizer = momentLocalizer(moment); // Set up the localizer with moment.js

const Schedule = () => {
  const [date, setDate] = useState(new Date()); // Set initial date state
  const isMounted = useRef(true); // Create a ref to track if the component is mounted
  const events = [
    {
      start: new Date(2024, 10, 3, 11, 30), // Nov 3, 2024
      end: new Date(2024, 10, 3, 12, 0),
      title: "Wales Restaurant - Wales offshore Chef",
    },
    {
      start: new Date(2024, 10, 4, 11, 30), // Nov 4, 2024
      end: new Date(2024, 10, 4, 12, 0),
      title: "Wales Restaurant - Four Points by Sheraton",
    },
    {
      start: new Date(2024, 10, 5, 14, 0), // Nov 5, 2024
      end: new Date(2024, 10, 5, 15, 0),
      title: "Meeting with Marketing Team",
    },
    // Add more events as needed
  ];
  useEffect(() => {
    return () => {
      isMounted.current = false; // Set mounted state to false on unmount
    };
  }, []);

  const handleSelectEvent = (event) => {
    if (isMounted.current && event) {
      alert(event.title); // Handle event selection
    }
  };

  const CustomToolbar = ({ label }) => {
    return (
      <div className="my-custom-toolbar text-center mb-2">
        <span className="text-lg ">{label}</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="w-full h-[92vh] md:px-12 px-5 py-3">
        <div className="w-full h-[8%] flex justify-between md:gap-0 gap-4 my-3">
          <div>
            <h5 className="md:text-[20px] text-[16px] font-medium text-black">
              Schedule
            </h5>
            <p className="text-[#667085] md:text-[14px] text-[12px] font-normal">
              See days you are available fpr work
            </p>
          </div>

          {/* <div className="md:h-[40px] h-[35px] px-4 flex items-center justify-items-center md:gap-4 gap-3 bg-appGreen text-white md:text-[14px] text-[12px] rounded-[100px] cursor-pointer transition-all duration-300 hover:bg-teal-600">
        <FaPlusCircle />
        Generate Data
      </div> */}
        </div>

        <div className="w-full h-[95%] bg-white rounded-[10px] border border-[#E4E7EC] flex flex-col gap-3 overflow-y-auto p-4 scroller-none">
          <div className="mt-4">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent} // Handle event selection
              onNavigate={(date) => setDate(date)} // Handle date navigation
              views={["month", "week", "day", "list"]} // Specify available views
              defaultView="month"
              components={{
                toolbar: CustomToolbar, // Set the custom toolbar
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
