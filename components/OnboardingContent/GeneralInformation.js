// import React from "react";
// import { PngIcon } from "../Icon";
// GeneralInformation.js
import React from "react";

export const GeneralInformation = () => {
  return (
    <>
      <div className="w-full py-5">
        <h3 className="font-medium md:text-[23px] text-[16px]">
          General Information
        </h3>
        <h6 className="mt-2 text-[14px] text-[#667080] font-medium">
          Do you have experience in any of the following: (please state yes or
          no)
        </h6>
        <div className="grid grid-cols-2 mt-4 gap-3">
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Plate Waiting</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              true
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Retail Cashier</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              true
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Bar Work</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              true
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Hospitality</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              true
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Food Service</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              true
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">Barista</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              false
            </h4>
          </div>
          <div>
            <p className="text-[12px] text-[#9F9F9F]">
              Supervising / Managing Staff
            </p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              false
            </h4>
          </div>
        </div>
        <h6 className="mt-2 text-[14px] text-[#667080] font-medium">
          Do you have any of the below qualifications/documents? (please state
          yes or no)
        </h6>
        <div className="w-full grid grid-cols-2 mt-4 gap-3">
          <div className="w-full">
            <p className="md:text-[14px] text-[12px] text-[#9F9F9F]">
              Personal License Holder
            </p>
            <h6 className="md:text-[14px] text-[12px] text-[#3C3C3C] capitalize font-bold">
              Yes
            </h6>
            <a
              href="#"
              target="_blank"
              className="w-full md:h-[48px] h-[36px] flex items-center justify-between px-3 border-dashed border-[#D0D5DD] bg-[#F0F0F0] truncate rounded-[10px]"
            >
              {/* <PngIcon /> */}
              <span className="text-[10px] text-[#9F9F9F]">View</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
