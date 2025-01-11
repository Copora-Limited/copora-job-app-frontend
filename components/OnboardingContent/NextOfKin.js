import React from "react";

export const NextOfKin = ({ nextOfKin }) => {
  //   console.log("nextOfKin", nextOfKin);

  // Validate nextOfKin data
  if (!nextOfKin || Object.keys(nextOfKin).length === 0) {
    return <div>Loading...</div>;
  }

  const formatBoolean = (value) => {
    return value ? "Yes" : "No";
  };

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Next of Kin Information
      </h3>
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        <div>
          <p className="text-[12px] text-[#9F9F9F]">First Name</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
            {nextOfKin.firstName || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Last Name</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
            {nextOfKin.lastname || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Relationship</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
            {nextOfKin.relationship || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Address</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
            {nextOfKin.address || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Email</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold lowercase">
            {nextOfKin.email || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Phone Number</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
            {nextOfKin.phoneNumber || "N/A"}
          </h4>
        </div>
        <div>
          <p className="text-[12px] text-[#9F9F9F]">Attempted Contact</p>
          <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
            {formatBoolean(nextOfKin.attempted)}
          </h4>
        </div>
      </div>
    </div>
  );
};
