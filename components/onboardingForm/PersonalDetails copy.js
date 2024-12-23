import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import UploadBtn from "@/components/Custom/Buttons/UploadBtn";
import { UploadIcon } from "@/components/Icon";
import UploadedFile from "@/components/Custom/UploadedFile";
import OptionsComponent from "@/components/GeneralInformation/OptionComponentNew";

import { CircleSpinnerOverlay } from "react-spinner-overlay";

const PersonalDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    declarationAccepted: false,
  });
  // const [hasFetchedData, setHasFetchedData] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [requireWorkVisa, setRequireWorkVisa] = useState("false");
  const [declarationAccepted, setDeclarationAccepted] = useState("false"); // Keep as string for backend compatibility

  const fileRef = useRef(null);
  const fileRefs = {
    passport: useRef(null),
    ninProof: useRef(null),
    addressProof: useRef(null),
    photo: useRef(null),
  };
  const [nin, setNin] = useState(Array(9).fill("")); // Initialize NIN array with 9 empty strings
  const hasFetchedDataRef = useRef(false); // Track if data has been fetched

  useEffect(() => {
    if (hasFetchedDataRef.current || !token || !applicationNo) return; // Prevent re-fetching if data is already fetched

    const fetchApplicantData = async () => {
      setIsLoading(true);

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
        onChange(data);
        setLocalFormData(data);
        setProfilePic(data.passportPhoto || "");
        setNin(data.nationalInsuranceNumber?.split("") || Array(9).fill("")); // Split NIN into digits
        setRequireWorkVisa(data.requireWorkVisa);
        setDeclarationAccepted(data.declarationAccepted || "false"); // Set initial declarationAccepted
        hasFetchedDataRef.current = true; // Set ref to true after fetching
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applicant data:", error);
        setIsLoading(false);
      }
    };

    fetchApplicantData();
  }, [token, applicationNo, onChange]); // Remove hasFetchedData from dependencies

  const handleChange = (field, value) => {
    const updatedFormData = { ...localFormData, [field]: value };
    onChange(updatedFormData); // Notify parent component
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

  // const handleClick = () => {
  //   fileRef.current?.click();
  // };

  const handleClick = () => {
    if (fileRef.current) fileRef.current.click();
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

      // Move focus to the next input if the current one is filled
      if (value && index < nin.length - 1) {
        document.getElementById(`nin-${index + 1}`).focus();
      }
    }
  };

  const handleUploadClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleUploadFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFormData = { ...localFormData, [fileType]: file };
      setLocalFormData(updatedFormData);
      onChange(updatedFormData);
    }
  };

  const renderUploadSection = (fileType, title, id) => {
    const file = localFormData[fileType]; // This should either be a URL string or a File object
    let fileName = null;

    // Check if the file is a string (URL) or a File object
    if (typeof file === "string") {
      // If it's a string (existing file URL), get the name from the URL
      fileName = file.split("/").pop();
    } else if (file && typeof file === "object") {
      // If it's a File object (newly uploaded), get the name from the File object
      fileName = file.name;
    }

    const handleDeleteFile = () => {
      const updatedFormData = { ...localFormData, [fileType]: null }; // Clear the uploaded file
      setLocalFormData(updatedFormData); // Update local form data
      onChange(updatedFormData); // Call onChange to update parent state
    };

    return (
      <div className="w-full md:h-[75px] h-[60px]">
        {file ? ( // If a file exists, show the UploadedFile component
          <UploadedFile
            fileName={fileName} // Show the name of the uploaded file
            onDelete={handleDeleteFile} // Provide delete functionality
            type=".pdf"
          />
        ) : (
          // If no file exists, show the upload area
          <div
            className="w-full md:h-[75px] h-[60px] border-dashed border border-[#D0D5DD] rounded-[10px] px-5 mt-3 flex items-center justify-between gap-3 transition-all duration-500 hover:border-appGreen cursor-pointer"
            onClick={() => handleUploadClick(id)} // Trigger file input click
          >
            <UploadIcon />
            <div>
              <p className="text-[10px] sm:text-[12px] text-primary font-bold">{`Upload ${title}`}</p>
              <p className="text-[10px] sm:text-[12px] text-[#98A2B3]">
                PDF, DOCX, DOC, PNG, JPG, JPEG | 2MB max.
              </p>
            </div>
            <div className="w-[80px] h-[36px] flex items-center justify-center bg-teal-700 text-white text-[14px] rounded-[6px]">
              Upload
            </div>
            <input
              type="file"
              id={id}
              className="hidden"
              onChange={(event) => handleUploadFileChange(event, fileType)} // Handle file change
              accept=".pdf, docx, .doc, .png, .jpg, .jpeg"
            />
          </div>
        )}
      </div>
    );
  };

  const handleCheckboxChange = (name, value) => {
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData);
  };

  const handleDeclarationToggle = () => {
    const newValue = declarationAccepted === "false" ? "true" : "false"; // Toggle between "true" and "false"
    setDeclarationAccepted(newValue);
    handleCheckboxChange("declarationAccepted", newValue); // Update localFormData with string value
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <content>
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

          <div>
            <UploadBtn text="Upload Passport" onClick={handleClick} />
            <div className="text-[12px] font-azoSansRegular my-2">
              Submit a recent, passport-style headshot or a selfie featuring a
              professional smile.
            </div>
          </div>
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
                  ? new Date(localFormData.dateOfBirth)
                      .toISOString()
                      .slice(0, 10)
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

          <div className="mt-4">
            <label
              htmlFor="nationalInsuranceNumber"
              className="block text-sm font-medium text-gray-700"
            >
              National Insurance Number
            </label>
            <p className="text-[12px] font-azoSansRegular">
              This will be in your National Insurance letter, payslip, or P60.
              For example, 'QQ 12 34 56 C'
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
                  placeholder={index < 2 ? "A" : index < 8 ? "0" : "A"}
                  className="w-10 h-10 text-center border rounded"
                />
              ))}
            </div>
          </div>

          {/* Proof of National Insurance Number */}
          <div className="mt-4">
            <label
              htmlFor="passport"
              className="block text-[14px] text-gray-900 font-medium"
            >
              Proof of National Insurance Number
            </label>
            {renderUploadSection(
              "ninProof",
              "Proof of National Insurance Number",
              "fileInputninproof"
            )}
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Proof of Address */}
          <div>
            <label
              htmlFor="addressProof"
              className="block text-[14px] text-gray-900 font-medium"
            >
              Proof of Address
            </label>
            <p className="text-[12px] font-azoSansRegular">
              Provide either a recent bank statement or an official
              government-issued letter.
            </p>

            {renderUploadSection(
              "addressProof",
              "Proof of Address",
              "fileInputAddressProof"
            )}
          </div>

          {/* Passport / Driver's License */}
          <div>
            <label
              htmlFor="internationalPassport"
              className="block text-[14px] text-gray-900 font-medium"
            >
              Passport / Driver's license
            </label>
            <p className="text-[12px] font-azoSansRegular">
              Upload Data page of your Passport or Driver's license
            </p>
            {renderUploadSection(
              "internationalPassport",
              "Passport or Driver's license",
              "fileInputPassPort"
            )}
          </div>
        </div>

        <div className="w-full flex items-center gap-3 my-10">
          <OptionsComponent
            title="Do you require a work visa to work in the resident country?"
            isCheckedLeft={localFormData.requireWorkVisa === "true"}
            setIsCheckedLeft={() =>
              handleCheckboxChange("requireWorkVisa", "true")
            }
            isCheckedRight={localFormData.requireWorkVisa === "false"}
            setIsCheckedRight={() =>
              handleCheckboxChange("requireWorkVisa", "false")
            }
            idLeft="RequireVisaYes"
            idRight="RequireVisaNo"
          />
        </div>

        {localFormData.requireWorkVisa === "true" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visa Document */}
            <div>
              <label
                htmlFor="visaDocument"
                className="block text-[14px] text-gray-900 font-medium"
              >
                Visa Document
              </label>
              <p className="text-[12px] font-azoSansRegular">
                Upload your visa document for verification
              </p>
              {renderUploadSection(
                "visaDocument",
                "Visa Document",
                "fileInputvisa"
              )}
            </div>
          </div>
        )}

        {/* Declaration Section */}

        {/* Declaration Agreement Toggle */}
        {/* <div className="w-full flex items-center gap-3 col-span-2">
        <input
          type="checkbox"
          id="declarationAccepted"
          checked={declarationAccepted === "true"}
          onChange={handleDeclarationToggle}
          className="mr-2"
        />
        <label
          htmlFor="declarationAccepted"
          className="text-gray-900 font-medium"
        >
          “I hereby confirm that the information provided is accurate, complete,
          and truthful. I affirm that all documents submitted along with this
          form are genuine and unaltered. I agree to promptly inform Copora Ltd.
          in writing of any changes to the information provided, and I commit to
          updating my information as requested by Copora Ltd. I understand that
          this declaration is final, binding, and cannot be revoked or
          modified.”
        </label>
      </div> */}

        {/*  */}
      </content>
    </>
  );
};

export default PersonalDetails;
