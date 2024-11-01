import React, { useState, useEffect } from "react";
import { FaTrash, FaPlusCircle, FaAsterisk } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import { RiDeleteBin5Line } from "react-icons/ri";

const ReferenceDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;
  const [isMounted, setIsMounted] = useState(false);
  // const [localFormData, setLocalFormData] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [referenceRecords, setReferenceRecords] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    const fetchReferenceData = async () => {
      if (hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reference/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch reference data."
          );
        }

        const data = await response.json();

        // If the fetched data is empty, start with one empty record
        const initialData = data.length
          ? data
          : [
              {
                employerName: "",
                contactName: "",
                phone: "",
                email: "",
                address: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                responsibilities: "",
              },
            ];

        setReferenceRecords(initialData);
        onChange(initialData);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching reference data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferenceData();
  }, [hasFetchedData, onChange]);

  const handleReferenceChange = (index, field, value) => {
    const updatedRecords = referenceRecords.map((record, i) =>
      i === index ? { ...record, [field]: value } : record
    );
    setReferenceRecords(updatedRecords);
    onChange(updatedRecords);
  };

  const addReferenceRecord = () => {
    setReferenceRecords([
      ...referenceRecords,
      {
        employerName: "",
        contactName: "",
        phone: "",
        email: "",
        address: "",
      },
    ]);
  };

  const removeReferenceRecord = async (index) => {
    const recordToDelete = referenceRecords[index];
    const confirmed = window.confirm(
      `Are you sure you want to delete the reference for ${recordToDelete.contactName}?`
    );

    if (confirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/reference/${applicationNo}/${recordToDelete.id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to delete reference record."
          );
        }

        const updatedRecords = referenceRecords.filter((_, i) => i !== index);
        setReferenceRecords(updatedRecords);
        onChange(updatedRecords);
      } catch (error) {
        console.error("Error deleting reference record:", error);
        // Optionally, you can display an error message to the user
      }
    }
  };

  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      {referenceRecords.map((record, index) => (
        <div
          key={index}
          className=" p-4 mb-4 rounded w-full grid md:grid-cols-2 grid-cols-1 gap-3 mb-8 pb-6"
        >
          {/* Remove Button */}
          {referenceRecords.length > 1 && (
            <div className="flex justify-end md:col-span-2 col-span-1">
              <RiDeleteBin5Line
                className="mr-2 cursor-pointer text-appMuted transition-all duration-300 hover:text-red-500"
                onClick={() => removeReferenceRecord(index)}
              />
            </div>
          )}
          <div className="w-full flex flex-col md:col-span-2 col-span-1 gap-1">
            <PrimaryInput
              id={`employer`}
              label="Employer"
              type="text"
              placeholder="Enter employer's name"
              name={`employerName`}
              value={record.employerName}
              onChange={(e) =>
                handleReferenceChange(index, "employerName", e.target.value)
              }
              // isDelete
              // handleDelete={() => removeReferenceRecord(index)}
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <PrimaryInput
              id={`jobTitle`}
              label={`Job Title`}
              type="text"
              placeholder="Enter Job title"
              name={`jobTitle`}
              value={record.jobTitle}
              onChange={(e) =>
                handleReferenceChange(index, "jobTitle", e.target.value)
              }
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <PrimaryInput
              id={`contactName`}
              label="Contact Name"
              type="text"
              placeholder="Enter Contact Name"
              name={`contactName`}
              value={record.contactName}
              onChange={(e) =>
                handleReferenceChange(index, "contactName", e.target.value)
              }
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <label className="md:text-[14px] text-[12px] text-[#344054] font-medium flex items-center gap-1">
              Phone Number{" "}
              <span className="text-red-600">
                <FaAsterisk size={6} />
              </span>
            </label>

            <PhoneInput
              country={"gb"}
              value={record.phone}
              onChange={(value) => handleReferenceChange(index, "phone", value)}
              preferredCountries={["uk"]}
              buttonClass="h-full w-fit"
              enableSearch
              dropdownClass=""
              inputStyle={{
                width: "100%",
                height: "38px",
                borderRadius: "8px",
                color: "#667085",
                border: "1px solid #D0D5DD",
                fontWeight: "500",
              }}
              buttonStyle={{
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                border: "1px solid #D0D5DD",
              }}
              containerStyle={{
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <PrimaryInput
              id={`email`}
              label={`Email`}
              isRequired
              type="text"
              placeholder="Enter email"
              name={`email`}
              value={record.email}
              onChange={(e) =>
                handleReferenceChange(index, "email", e.target.value)
              }
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <PrimaryInput
              id={`startDate`}
              label={`Start Date`}
              isRequired
              type="date"
              placeholder="DD/MM/YYYY"
              name={`startDate`}
              value={record.startDate}
              onChange={(e) =>
                handleReferenceChange(index, "startDate", e.target.value)
              }
            />
          </div>

          <div className="w-full flex flex-col md:col-span-1 col-span-2 gap-1">
            <PrimaryInput
              id={`endDate`}
              label={`End Date`}
              type="date"
              placeholder="DD/MM/YYYY"
              name={`endDate`}
              value={record.endDate}
              onChange={(e) =>
                handleReferenceChange(index, "endDate", e.target.value)
              }
            />
          </div>

          <div className="w-full flex flex-col md:col-span-2 col-span-1 gap-1">
            <PrimaryInput
              id={`address`}
              label="Address"
              type="text"
              placeholder="Enter address"
              name={`address`}
              value={record.address}
              onChange={(e) =>
                handleReferenceChange(index, "address", e.target.value)
              }
            />
          </div>
          <div className="w-full flex flex-col md:col-span-2 col-span-1 gap-1">
            <PrimaryInput
              id={`responsibilities`}
              label="Responsibilities"
              type="text"
              placeholder="Enter responsibilities"
              name={`responsibilities`}
              value={record.responsibilities}
              onChange={(e) =>
                handleReferenceChange(index, "responsibilities", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div
        className="w-full flex items-center justify-end gap-2 text-appGreen cursor-pointer text-[14px]"
        onClick={addReferenceRecord}
      >
        <FaPlusCircle />
        <span className="mt-1">Add Another Reference</span>
      </div>
    </>
  );
};

export default ReferenceDetails;
