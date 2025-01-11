import React from "react";

export const References = ({ applicantdata }) => {
  // console.log("applicantdata", applicantdata);
  if (!applicantdata || !applicantdata.length) {
    return <div>No references available.</div>;
  }
  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">References</h3>
      {/* grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]" */}
      <div className="space-y-4 mt-4 gap-3 p-2  rounded-md bg-[#F9F9F9]">
        {applicantdata.map((reference, index) => (
          <div key={index} className="border-b p-2 ">
            <h4 className="font-semibold text-lg">
              Employer Name: {reference.employerName}
            </h4>
            <p className="text-sm text-[#9F9F9F]">
              Job Title: {reference.jobTitle}
            </p>
            <p className="text-sm text-[#3C3C3C]">
              Contact Name: {reference.contactName}
            </p>
            <p className="text-sm text-[#3C3C3C]">Phone: {reference.phone}</p>
            <p className="text-sm text-[#3C3C3C]">Email: {reference.email}</p>
            <p className="text-sm text-[#3C3C3C]">
              Address: {reference.address}
            </p>
            <p className="text-sm text-[#3C3C3C]">
              Start Date: {new Date(reference.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-[#3C3C3C]">
              End Date: {new Date(reference.endDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-[#3C3C3C]">
              Responsibilities: {reference.responsibilities || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
