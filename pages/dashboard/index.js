import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { FaPlusCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import StatisticsCard from "@/components/dashboard/StatisticCard";
import CalendarComponent from "@/components/dashboard/CalendarComponent";
import ShiftCard from "@/components/dashboard/ShiftCard";

export default function ApplicantPage() {
  const { data: session } = useSession();
  const fullName = session?.user?.firstName + " " + session?.user?.lastName;
  const profilePicture = session?.user?.profilePicture;
  const applicationNo = session?.user?.applicationNo;

  return (
    <DashboardLayout>
      <div className="w-full min-h-screen md:px-12 px-5 py-3">
        <div className="w-full bg-white rounded-[10px] border border-[#E4E7EC] flex flex-col gap-4 p-4 overflow-y-auto scroller-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
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

              <div className="mt-4">
                <h5 className="text-lg md:text-xl text-black font-medium">
                  Statistics
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatisticsCard
                    detail="100 hrs"
                    title="Total Shift"
                    color="#F6F8FD"
                  />
                  <StatisticsCard
                    detail="60 hrs"
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
                <h3 className="text-lg font-medium mb-4">Upcoming Shifts</h3>
                <div className="flex space-x-4 overflow-x-auto">
                  <ShiftCard
                    date="Thursday, June 12th"
                    title="Wales Restaurant - Wales offshore Chef"
                    time="9:00AM - 6:00PM"
                    location="Wales, UK"
                    role="Driver"
                  />
                  <ShiftCard
                    date="Friday, June 13th"
                    title="Seaside Diner - Coastal Chef"
                    time="10:00AM - 4:00PM"
                    location="Seaside, UK"
                    role="Chef"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-4">
              <div className="flex flex-col items-center text-center shadow-lg rounded-lg p-4 bg-gray-50">
                <img
                  src={profilePicture || "/assets/default_user.png"}
                  alt="User Profile"
                  className="rounded-full w-20 h-20 mb-2"
                />
                <div className="font-semibold">{fullName}</div>
                <div className="text-sm text-gray-500">{applicationNo}</div>
              </div>
              <div className="mt-4">
                <CalendarComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
