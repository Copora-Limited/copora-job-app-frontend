import React from "react";

export const ContactInformation = ({ applicantdata }) => {
  if (!applicantdata || Object.keys(applicantdata).length === 0) {
    return <div>Loading...</div>;
  }

  const contactInfoFields = [
    { label: "Phone Number*", value: applicantdata.phone },
    { label: "Apt No*", value: applicantdata.applicationNo },
    { label: "Address Line 1*", value: applicantdata.address_line_1 },
    { label: "Address Line 2", value: applicantdata.address_line_2 },
    { label: "Country", value: applicantdata.country },
    { label: "Town", value: applicantdata.town },
    { label: "Post Code", value: applicantdata.postcode },
    { label: "LinkedIn", value: applicantdata.linkedin },
    { label: "Twitter", value: applicantdata.twitter },
  ];

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Contact Information
      </h3>
      {/* grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9] */}
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        {contactInfoFields.map((field, index) => (
          <div key={index}>
            <p className="text-[12px] text-[#9F9F9F]">{field.label}</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              {field.value || "N/A"}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
