import React from "react";

export const BankDetails = ({ bankDetails }) => {
  if (!bankDetails) {
    return <div>No bank details record Available</div>;
  }

  return (
    <>
      <div className="w-full py-5 border-b">
        <h3 className="font-medium md:text-[23px] text-[16px]">Bank Details</h3>
        <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
          <div>
            <h4 className="font-semibold">Bank Name:</h4>
            <p className="text-sm text-[#3C3C3C]">{bankDetails.bankName}</p>
          </div>
          <div>
            <h4 className="font-semibold">Account Number:</h4>
            <p className="text-sm text-[#3C3C3C]">
              {bankDetails.accountNumber}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Sort Code:</h4>
            <p className="text-sm text-[#3C3C3C]">{bankDetails.sortCode}</p>
          </div>
          <div>
            <h4 className="font-semibold">Account Name:</h4>
            <p className="text-sm text-[#3C3C3C]">{bankDetails.accountName}</p>
          </div>
          <div>
            <h4 className="font-semibold">Employment Status Declaration:</h4>
            <p className="text-sm text-[#3C3C3C]">
              {bankDetails.employmentStatusDeclaration}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Student Loan Status:</h4>
            <p className="text-sm text-[#3C3C3C]">
              {bankDetails.studentLoanStatus || "Not Applicable"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">P45 Attached:</h4>
            <p className="text-sm text-[#3C3C3C]">
              {bankDetails.p45Attached ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
