import React from "react";
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed
import { FaPlusCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ApplicantPage() {
  const { data: session } = useSession();
  const fullName = session?.user?.firstName + " " + session?.user?.lastName;

  return (
    <DashboardLayout>
      <div className="w-full h-[92vh] grid grid-rows-[10%_1fr] md:px-12 px-5 py-3">
        <div className="w-full h-[8%] flex justify-between md:gap-0 gap-4 mt-1">
          <div>
            <h5 className="md:text-[20px] text-[16px] font-medium text-black">
              Dashboard
            </h5>
            <p className="text-[#667085] md:text-[14px] text-[12px] font-normal">
              Welcome {fullName}
            </p>
          </div>

          {/* <div className="md:h-[40px] h-[35px] px-4 flex items-center justify-items-center md:gap-4 gap-3 bg-appGreen text-white md:text-[14px] text-[12px] rounded-[100px] cursor-pointer transition-all duration-300 hover:bg-teal-600">
            <FaPlusCircle />
            Generate Data
          </div> */}
        </div>

        <div className="w-full h-[95%] mt-3 bg-white rounded-[10px] border border-[#E4E7EC] flex flex-col gap-3 overflow-y-auto p-4 scroller-none">
          <div className="w-full h-[170px] rounded-[12px] flex items-center justify-between bg-secondary p-4">
            <div className="md:basis-[50%] basis-full text-white h-full flex flex-col justify-center gap-2">
              <h6 className="text-[10px] font-bold">OVERVIEW</h6>
              <h2 className="md:text-[20px] text-[16px] font-bold">
                Welcome to your Dashboard!.
              </h2>
              <p className="md:text-[14px] text-[12px] font-light">
                Get a comprehensive overview of your workforce, key metrics, and
                important updates at a glance. Stay informed and in control of
                your operations effortlessly.
              </p>
            </div>
            <div className="md:basis-[30%] basis-0 md:flex hidden w-full h-full items-center justify-center">
              <button className="py-[10px] px-[20px] bg-appGreen rounded-[100px] text-white">
                Learn More.
              </button>
            </div>
            <div className="md:basis-[20%] basis-0 md:flex hidden"></div>
          </div>
          <div>
            {/* Data */}
            Data goes here
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
