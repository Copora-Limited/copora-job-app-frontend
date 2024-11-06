import React, { useState, useEffect } from "react";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const BankDetailsForm = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [hasFetchedData, setHasFetchedData] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    sortCode: "",
    accountName: "",
    employmentStatusDeclaration: "",
    studentLoanStatus: "",
    // p45Attached: false,
    attempted: false,
  });

  useEffect(() => {
    setIsMounted(true);

    const fetchBankDetails = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bank-details/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bank details.");
        }

        const data = await response.json();
        setBankDetails(data);
        onChange(data);
        setIsLoading(false);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching bank details:", error);
        setIsLoading(false);
      }
    };

    fetchBankDetails();
  }, [applicationNo, token, hasFetchedData, onChange]);

  const handleChange = (field, value) => {
    const updatedBankDetails = { ...bankDetails, [field]: value };
    setBankDetails(updatedBankDetails);
    onChange(updatedBankDetails);
  };

  // Handler to ensure only one checkbox is selected
  const handleCheckboxChange = (field, value) => {
    handleChange(field, bankDetails[field] === value ? "" : value);
  };

  //   if (isLoading) {
  //     return <CircleSpinnerOverlay loading={isLoading} />;
  //   }

  return (
    <div>
      {/* Bank Details Inputs */}
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 mt-4">
        <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
          <PrimaryInput
            id="bankName"
            label="Bank Name"
            type="text"
            placeholder="Enter Bank Name"
            value={bankDetails.bankName}
            onChange={(e) => handleChange("bankName", e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
          <PrimaryInput
            id="accountNumber"
            label="Account Number"
            type="text"
            placeholder="00-00-00-00"
            maxLength={8}
            value={bankDetails.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
          <PrimaryInput
            id="sortCode"
            label="Sort Code"
            type="text"
            placeholder="00-00-00"
            maxLength={6}
            value={bankDetails.sortCode}
            onChange={(e) => handleChange("sortCode", e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
          <PrimaryInput
            id="accountName"
            label="Account Name"
            type="text"
            placeholder="Enter Account Name"
            value={bankDetails.accountName}
            onChange={(e) => handleChange("accountName", e.target.value)}
          />
        </div>
      </div>

      {/* Employment Status Declaration */}
      <div className="mt-6">
        <h6 className="text-[14px] text-black font-medium">
          Tick one of the following three statements:
        </h6>

        {[
          {
            id: "firstJob",
            label:
              "This is my first job since last 6 April and I have not been receiving taxable Jobseeker's Allowance, Employment and Support Allowance, taxable Incapacity Benefit, State or Occupational Pension.",
          },
          {
            id: "onlyJob",
            label:
              "This is now my only job but since last 6 April I have had another job, or received taxable Jobseeker's Allowance, Employment and Support Allowance, taxable Incapacity Benefit; I do not receive a State or Occupational Pension.",
          },
          {
            id: "otherJobOrPension",
            label:
              "As well as my new job, I have another job or receive a State or Occupational Pension.",
          },
        ].map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-[14px] text-black my-5"
          >
            <input
              type="checkbox"
              className="accent-appGreen"
              id={`employmentStatus-${index + 1}`} // Unique ID for each checkbox
              checked={bankDetails.employmentStatusDeclaration === option.label} // Check if the specific option is selected
              onChange={() =>
                handleCheckboxChange(
                  "employmentStatusDeclaration",
                  option.label
                )
              } // Handle change for the specific option
            />
            <label htmlFor={`employmentStatus-${index + 1}`}>
              {option.label}
            </label>{" "}
            {/* Use the label from the options */}
          </div>
        ))}

        <h6 className="text-[14px] text-black font-medium">
          Student Loan Status:
        </h6>

        {[
          {
            id: "type1StudentLoanRepayment",
            label: "I make Type 1 Student Loan repayments through payroll",
          },
          {
            id: "type2StudentLoanRepayment",
            label: "I make Type 2 Student Loan repayments through payroll",
          },
        ].map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-[14px] text-black mt-10 mb-5"
          >
            <input
              type="checkbox"
              className="accent-appGreen"
              id={`studentLoanStatus-${index + 1}`} // Unique ID for each checkbox
              checked={bankDetails.studentLoanStatus === option.label} // Check if the specific option is selected
              onChange={() =>
                handleCheckboxChange("studentLoanStatus", option.label)
              } // Handle change for the specific option
            />
            <label htmlFor={`studentLoanStatus-${index + 1}`}>
              {option.label}
            </label>{" "}
            {/* Use the label from the options */}
          </div>
        ))}

        {/* <h6 className="text-[14px] text-black font-medium">P45:</h6>

        <div className="flex items-center gap-3 text-[14px] text-black my-5">
          <input
            type="checkbox"
            id="p45Attached"
            className="accent-appGreen"
            checked={bankDetails.p45Attached}
            onChange={(e) => handleChange("p45Attached", e.target.checked)}
          />
          <label htmlFor="p45Attached">
            I attach a copy of the P45 from my previous employer.
          </label>
        </div> */}

        {/* {[
          {
            id: "p45Attached",
            label: "I attach a copy of the P45 from my previous employer.",
          },
        ].map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-[14px] text-black my-5"
          >
            <input
              type="checkbox"
              id={option.id} // Use the id from the option
              checked={bankDetails[option.label]} // Dynamically access the bankDetails property
              onChange={(e) => handleChange("p45Attached", option.label)} // Handle change for the specific option
              className="accent-appGreen"
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default BankDetailsForm;
