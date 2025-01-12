import React from "react";

export const PersonalDetails = ({ applicantdata }) => {
  if (!applicantdata || Object.keys(applicantdata).length === 0) {
    return <div>Loading...</div>;
  }

  const personalDetailsFields = [
    {
      label: "Date of Birth*",
      value: new Date(applicantdata.dateOfBirth).toLocaleDateString(),
    },
    { label: "Gender", value: applicantdata.gender },
    {
      label: "National Insurance Number",
      value: applicantdata.nationalInsuranceNumber,
    },
    {
      label: "Work Visa Required",
      value: applicantdata.requireWorkVisa === "true" ? "Yes" : "No",
    },
    {
      label: "International Passport",
      value: applicantdata.internationalPassport ? (
        <a
          href={applicantdata.internationalPassport}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500"
        >
          View Passport
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      label: "Visa Document",
      value: applicantdata.visaDocument ? (
        <a
          href={applicantdata.visaDocument}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500"
        >
          View Visa
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      label: "NIN Proof",
      value: applicantdata.ninProof ? (
        <a
          href={applicantdata.ninProof}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500"
        >
          View NIN Proof
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      label: "Address Proof",
      value: applicantdata.addressProof ? (
        <a
          href={applicantdata.addressProof}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500"
        >
          View Address Proof
        </a>
      ) : (
        "N/A"
      ),
    },
    {
      label: "Declaration Accepted",
      value: applicantdata.declarationAccepted ? "Yes" : "No",
    },
    // {
    //   label: "Application Attempted",
    //   value: personalDetails.attempted ? "Yes" : "No",
    // },
  ];

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Personal Details
      </h3>
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        {personalDetailsFields.map((field, index) => (
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
