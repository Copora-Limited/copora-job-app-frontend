import React, { useState, useEffect } from "react";
import { fetchApplicantRecord } from "@/hooks/actions";
import { useSessionContext } from "@/context/SessionContext";

export const WorkExperience = ({ applicationNo }) => {
  const { token } = useSessionContext();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workExperience, setWorkExperience] = useState(null);

  useEffect(() => {
    setIsMounted(true);

    const fetchWorkExperience = async () => {
      if (!token || !applicationNo) return;

      setIsLoading(true);
      try {
        const data = await fetchApplicantRecord(token, applicationNo);
        setWorkExperience(data.workExperience); // Fetches workExperience from API
      } catch (error) {
        console.error("Error fetching work experience:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkExperience();
  }, [token, applicationNo]);

  if (!isMounted || isLoading || !workExperience) {
    return <div>Loading...</div>;
  }

  const workExperienceFields = [
    { label: "Job Title*", value: workExperience.jobTitle },
    { label: "Company Name*", value: workExperience.companyName },
    { label: "Start Date*", value: workExperience.startDate },
    { label: "End Date", value: workExperience.endDate },
    { label: "Responsibilities", value: workExperience.responsibilities },
    { label: "Achievements", value: workExperience.achievements },
  ];

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Work Experience
      </h3>
      <div className="grid grid-cols-2 mt-4 gap-3">
        {workExperienceFields.map((field, index) => (
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
