import React, { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import PrimarySelect from "@/components/Custom/Select/PrimarySelect";
import { RiDeleteBin5Line } from "react-icons/ri";

const EducationDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;
  const [isMounted, setIsMounted] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [educationRecords, setEducationRecords] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    const fetchEducationData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/educational-details/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch educational details data."
          );
        }

        const data = await response.json();

        const initialData = data.length
          ? data.map((item) => ({
              ...item,
              stillStudying: item.stillStudying === "true", // Convert to boolean
            }))
          : [
              {
                certificateObtained: "",
                courseOfStudy: "",
                schoolName: "",
                yearAdmitted: "",
                yearGraduated: "",
                stillStudying: false, // Ensure this is included in the initial state
              },
            ];

        setEducationRecords(initialData);
        onChange(initialData);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching educational details data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducationData();
  }, [hasFetchedData, onChange]);

  const handleEducationChange = (index, field, value) => {
    const updatedRecords = educationRecords.map((record, i) =>
      i === index ? { ...record, [field]: value } : record
    );
    setEducationRecords(updatedRecords);
    onChange(updatedRecords);
  };

  const addEducationRecord = () => {
    setEducationRecords((prev) => [
      ...prev,
      {
        certificateObtained: "",
        courseOfStudy: "",
        schoolName: "",
        yearAdmitted: "",
        yearGraduated: "",
        stillStudying: false,
      },
    ]);
  };

  const removeEducationRecord = async (index) => {
    const recordToDelete = educationRecords[index];
    const confirmed = window.confirm(
      `Are you sure you want to delete the education record for ${recordToDelete.schoolName}?`
    );

    if (confirmed) {
      // Check if the record has an ID
      if (recordToDelete.id) {
        // Record has an ID, make an API call to delete it from the backend
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/educational-details/${applicationNo}/${recordToDelete.id}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message ||
                "Failed to delete educational details record."
            );
          }
        } catch (error) {
          console.error("Error deleting educational details record:", error);
        }
      }

      // Update the local state to remove the record regardless of whether it was saved or not
      const updatedRecords = educationRecords.filter((_, i) => i !== index);
      setEducationRecords(updatedRecords);
      onChange(updatedRecords);
    }
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      {educationRecords.map((record, index) => (
        <div
          key={index}
          className="border p-4 mb-4 rounded w-full grid md:grid-cols-2 grid-cols-1 gap-3 mb-8 pb-6"
        >
          {educationRecords.length > 1 && (
            <div className="flex justify-end md:col-span-2 col-span-1">
              <RiDeleteBin5Line
                className="mr-2 cursor-pointer text-appMuted transition-all duration-300 hover:text-red-500"
                onClick={() => removeEducationRecord(index)}
              />
            </div>
          )}
          <div className="w-full flex flex-col col-span-2 gap-1">
            <PrimaryInput
              id="school"
              label="Name of School / College / University"
              isRequired
              type="text"
              placeholder="Enter name of School / College / University"
              value={record.schoolName}
              onChange={(e) =>
                handleEducationChange(index, "schoolName", e.target.value)
              }
              name="school"
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1 mt-4">
            <PrimarySelect
              label="Select Qualifications"
              id="title"
              className="mt-1"
              initialValue={"--- Select Qualifications ---"}
              options={[
                "GCSEs",
                "A-Levels",
                "NVQ",
                "Diploma",
                "Bachelor's",
                "Master's",
              ]}
              value={record.certificateObtained}
              onChange={(e) =>
                handleEducationChange(
                  index,
                  "certificateObtained",
                  e.target.value
                )
              }
              name="certificate"
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 mt-4">
            <PrimaryInput
              id="courseOfStudy"
              label="Subject Studied"
              type="text"
              placeholder="Enter subject studied"
              value={record.courseOfStudy}
              onChange={(e) =>
                handleEducationChange(index, "courseOfStudy", e.target.value)
              }
              name="courseOfStudy"
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 mt-4">
            <PrimaryInput
              id="yearAdmitted"
              label="Year Admitted"
              isRequired
              type="text"
              placeholder="YYYY"
              value={record.yearAdmitted}
              onChange={(e) =>
                handleEducationChange(index, "yearAdmitted", e.target.value)
              }
              name="yearAdmitted"
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 mt-4 ">
            <PrimaryInput
              id="yearGraduated"
              label="Date of Completion"
              isRequired
              type="text"
              placeholder="YYYY"
              value={
                record.stillStudying
                  ? new Date().getFullYear()
                  : record.yearGraduated
              }
              onChange={(e) =>
                handleEducationChange(index, "yearGraduated", e.target.value)
              }
              name="yearGraduated"
            />
          </div>

          <div className="w-full flex flex-col col-span-2 gap-1 items-end ">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`stillStudying-${index}`}
                name="stillStudying"
                checked={record.stillStudying}
                onChange={(e) =>
                  handleEducationChange(
                    index,
                    "stillStudying",
                    e.target.checked
                  )
                }
                className="w-4 h-4 rounded accent-appGreen"
              />
              <label
                htmlFor={`stillStudying-${index}`}
                className="text-[12px] text-[#667085]"
              >
                Still Studying
              </label>
            </div>
          </div>
        </div>
      ))}

      <div
        className="w-full flex items-center justify-end gap-2 text-appGreen cursor-pointer text-[14px]"
        onClick={addEducationRecord}
      >
        <FaPlusCircle />
        <span className="mt-1">Add Another educational details</span>
      </div>
    </>
  );
};

export default EducationDetails;
