import React from "react";

export const GeneralInformation = ({ applicantdata }) => {
  // Check if applicantdata is valid
  if (!applicantdata || Object.keys(applicantdata).length === 0) {
    return <div>Loading...</div>;
  }

  const formatBoolean = (value) => {
    if (typeof value !== "string") return "No"; // Default to "No" if not a string
    return value.trim().toLowerCase() === "true" ? "Yes" : "No";
  };

  // Sections of experience and qualifications
  const experiences = [
    { label: "Plate Waiting", value: applicantdata.plateWaiting },
    { label: "Retail Cashier", value: applicantdata.retailCashier },
    { label: "Bar Work", value: applicantdata.barWork },
    { label: "Hospitality", value: applicantdata.hospitality },
    { label: "Food Service", value: applicantdata.foodService },
    { label: "Barista", value: applicantdata.barista },
    { label: "Supervising / Managing Staff", value: applicantdata.supervising },
  ];

  const qualifications = [
    {
      label: "Personal License Holder",
      value: applicantdata.personalLicenseHolder,
      upload: applicantdata.personalLicenseCertificateUpload,
    },
    {
      label: "Level 2 Food Hygiene Certificate",
      value: applicantdata.level2FoodHygieneCertificate,
      upload: applicantdata.level2FoodHygieneCertificateUpload,
    },
    {
      label: "DBS Disclosure and Barring Service",
      value: applicantdata.dbsDisclosureAndBarringService,
      upload: applicantdata.dbsCertificateUpload,
    },
  ];

  return (
    <div className="w-full py-5 border-b ">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        General Information
      </h3>
      <h6 className="mt-2 text-[14px] text-[#667080] font-medium">
        Do you have experience in any of the following: (please state yes or no)
      </h6>
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        {experiences.map((exp, index) => (
          <div key={index}>
            <p className="text-[12px] text-[#9F9F9F]">{exp.label}</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              {formatBoolean(exp.value)}
            </h4>
          </div>
        ))}
      </div>

      <h6 className="mt-2 text-[14px] text-[#667080] font-medium">
        Do you have any of the below qualifications/documents? (please state yes
        or no)
      </h6>
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        {qualifications.map((qual, index) => (
          <div className="w-full" key={index}>
            <p className="md:text-[14px] text-[12px] text-[#9F9F9F]">
              {qual.label}
            </p>
            <h6 className="md:text-[14px] text-[12px] text-[#3C3C3C] capitalize font-bold">
              {formatBoolean(qual.value)}
            </h6>
            {qual.upload && (
              <a
                href={qual.upload}
                target="_blank"
                className="w-full md:h-[48px] h-[36px] hover:underline text-blue-500 flex items-center justify-between px-3 border-dashed border-[#D0D5DD] bg-[#F0F0F0] truncate rounded-[10px]"
                rel="noreferrer"
              >
                View
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
