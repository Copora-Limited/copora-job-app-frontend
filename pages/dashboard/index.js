import React from "react";
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed
import { FaPlusCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import StatisticsCard from "@/components/dashboard/StatisticCard"; // Adjust the path as needed
import CalendarComponent from "@/components/dashboard/CalendarComponent"; // A placeholder for the calendar
import ShiftCard from "@/components/dashboard/ShiftCard"; // A placeholder for the shift card
export default function ApplicantPage() {
  const { data: session } = useSession();
  const fullName = session?.user?.firstName + " " + session?.user?.lastName;
  const profilePicture = session?.user?.profilePicture;
  const applicationNo = session?.user?.applicationNo;

  return (
    <DashboardLayout>
      <div className="w-full h-[92vh]  md:px-12 px-5 py-3">
        {/* <div className="w-full h-[8%] flex justify-between md:gap-0 gap-4 mt-1">
          Welcome
        </div> */}
        <div></div>

        <div className="w-full h-[95%] bg-white rounded-[10px] border border-[#E4E7EC] flex flex-col gap-3 overflow-y-auto p-4 scroller-none">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-8">
              {/* <!-- Content for the 8-column section --> */}
              <div className="w-full h-[170px] rounded-[12px] flex items-center justify-between bg-[#ECF7F5] p-4">
                <div className="md:basis-[70%] basis-full text-secondary h-full flex flex-col justify-center gap-2">
                  <h6 className="text-[10px] font-bold">OVERVIEW</h6>
                  <h2 className="md:text-[20px] text-[16px] font-bold">
                    Welcome Back!.
                  </h2>
                  <p className="md:text-[14px] text-[12px] font-light">
                    Get a comprehensive overview of your workforce, key metrics,
                    and important updates at a glance. Stay informed and in
                    control of your operations effortlessly.
                  </p>
                </div>
                <div className="md:basis-[30%] basis-0 md:flex hidden w-full h-full items-center justify-center">
                  <button className="py-[10px] px-[20px] bg-appGreen rounded-[100px] text-white">
                    Learn More.
                  </button>
                </div>
              </div>
              {/*  */}
              <div className="mt-4">
                <h5 className="md:text-[24px] text-[18px] text-black font-medium">
                  Statistics
                </h5>
                <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-4">
                  <StatisticsCard
                    detail="100(hrs)"
                    title="Total Shift"
                    color="#F6F8FD"
                  />
                  <StatisticsCard
                    detail="60(hrs)"
                    title="Completed Shift"
                    color="#F0FBF6"
                  />
                  <StatisticsCard
                    detail="20"
                    title="Upcoming Shift"
                    color="#FEF8E7"
                  />
                  <StatisticsCard
                    detail="300"
                    title="Booked Shift"
                    color="#F6F8FD"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-medium mb-4">Upcoming Shift</h3>
                <div className="flex space-x-4 overflow-x-auto">
                  <ShiftCard
                    date="Thursday, June 12th"
                    title="Wales Restaurant - Wales offshore Chef"
                    time="9:00AM - 6:00PM"
                    location="Wales, UK"
                    role="Driver"
                  />
                  <ShiftCard
                    date="Thursday, June 12th"
                    title="Wales Restaurant - Wales offshore Chef"
                    time="9:00AM - 6:00PM"
                    location="Wales, UK"
                    role="Driver"
                  />
                  {/* Add more <ShiftCard /> components as needed */}
                </div>
              </div>
            </div>
            <div class="col-span-4 p-4">
              {/* Replace with actual profile card */}
              <div className="flex flex-col items-center justify-center  p-4 text-center shadow my-4">
                <img
                  src={
                    profilePicture ? profilePicture : "/assets/default_user.png"
                  }
                  alt="User Profile"
                  className="rounded-full w-20 h-20 mb-2"
                />

                <div className="">{fullName}</div>
                <div className="">{applicationNo}</div>
              </div>

              {/* <!-- Content for the 4-column section --> */}
              <CalendarComponent />
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </DashboardLayout>
  );
}
