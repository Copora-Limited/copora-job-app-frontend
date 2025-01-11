import React from "react";

export const EducationalDetails = ({ educationalDetails }) => {
  console.log("educationalDetails", educationalDetails);

  // Validate educationalDetails data
  if (!educationalDetails || educationalDetails.length === 0) {
    return <div>No Education details Available</div>;
  }

  const formatBoolean = (value) => {
    return value?.toString().trim().toLowerCase() === "true" ? "Yes" : "No";
  };

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Educational Details
      </h3>
      <div className="grid grid-cols-1 gap-6 mt-4">
        {educationalDetails.map((education, index) => (
          <div key={index} className="p-4 border rounded-md bg-[#F9F9F9]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[12px] text-[#9F9F9F]">School Name</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
                  {education.schoolName || "N/A"}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">
                  Certificate Obtained
                </p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
                  {education.certificateObtained || "N/A"}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">Course of Study</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
                  {education.courseOfStudy || "N/A"}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">Year Admitted</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
                  {education.yearAdmitted || "N/A"}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">Year Graduated</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
                  {education.yearGraduated || "N/A"}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">Still Studying</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
                  {formatBoolean(education.stillStudying)}
                </h4>
              </div>
              <div>
                <p className="text-[12px] text-[#9F9F9F]">Attempted Contact</p>
                <h4 className="text-[#3C3C3C] text-[12px] font-semibold">
                  {formatBoolean(education.attempted)}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
