import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import UploadBtn from "@/components/Custom/Buttons/UploadBtn";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const PersonalDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [localFormData, setLocalFormData] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);

    const fetchApplicantData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/personal-details/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch applicant data."
          );
        }

        const data = await response.json();
        setLocalFormData(data);
        setProfilePic(data.passportPhoto || "");
        onChange(data);
        setHasFetchedData(true); // Only set data once
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setIsLoading(false);
      }
    };

    fetchApplicantData();
  }, [token, applicationNo, hasFetchedData, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      const updatedFormData = { ...localFormData, passportPhoto: file };
      setLocalFormData(updatedFormData);
      onChange(updatedFormData);
    }
  };

  const handleClick = () => {
    fileRef.current?.click();
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="w-full flex items-center gap-3 mt-8">
        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
          accept="image/*"
        />

        <div className="relative w-[60px] h-[60px] rounded-full">
          <Image
            src={profilePic || "/assets/img/user-avatar.svg"}
            alt="user"
            fill
            className="rounded-full object-cover"
            placeholder="empty"
          />
          <Image
            src="/assets/img/verified_tick.svg"
            alt="verified tick"
            width={19}
            height={19}
            className="absolute bottom-0 right-0"
            placeholder="empty"
          />
        </div>

        <UploadBtn text="Upload profile" onClick={handleClick} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            required
            type="date"
            name="dateOfBirth"
            value={
              localFormData.dateOfBirth
                ? new Date(localFormData.dateOfBirth).toISOString().slice(0, 10)
                : ""
            }
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            required
            name="gender"
            value={localFormData.gender || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="nationalInsuranceNumber"
            className="block text-sm font-medium text-gray-700"
          >
            National Insurance Number
          </label>
          <input
            required
            type="text"
            name="nationalInsuranceNumber"
            value={localFormData.nationalInsuranceNumber || ""}
            onChange={handleChange}
            placeholder="National Insurance Number"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
