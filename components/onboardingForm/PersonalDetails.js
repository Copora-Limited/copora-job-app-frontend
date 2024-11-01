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
  const [nin, setNin] = useState(Array(9).fill("")); // Initialize NIN array with 9 empty strings

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
        setNin(data.nationalInsuranceNumber.split("") || Array(9).fill("")); // Split NIN into digits
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

  const handleNinChange = (index, e) => {
    const value = e.target.value.toUpperCase(); // Ensure the NIN is in uppercase
    const isValidInput =
      (index < 2 && /^[A-Za-z]?$/.test(value)) || // First 2 inputs: Alphabets only
      (index >= 2 && index < 8 && /^\d?$/.test(value)) || // Next 6 inputs: Numbers only
      (index === 8 && /^[A-Za-z]?$/.test(value)); // Last input: Alphabet only

    if (isValidInput && value.length <= 1) {
      const newNin = [...nin];
      newNin[index] = value;
      setNin(newNin);
      const nationalInsuranceNumber = newNin.join("");
      setLocalFormData({ ...localFormData, nationalInsuranceNumber });
      onChange({ ...localFormData, nationalInsuranceNumber });
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

      <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          {/* <label className="flex justify-left items-center">National Insurance Number <FaAsterisk size={6} color="red" /> </label> */}
          <p className="text-[12px] font-azoSansRegular">
            This will be in you National Insurance letter, payslip or P60. For
            example, 'QQ 12 34 56 C'
          </p>

          <div className="grid grid-cols-9 gap-2 mt-2">
            {nin.map((digit, index) => (
              <input
                key={index}
                id={`nin-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleNinChange(index, e)}
                placeholder={
                  index < 2 ? "A" : index < 8 ? "0" : "A" // Set appropriate placeholder
                }
                className="w-10 h-10 text-center border rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
