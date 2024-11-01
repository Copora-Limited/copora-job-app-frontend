import React, { useState, useEffect } from "react";
import OptionsComponent from "@/components/GeneralInformation/OptionComponentNew";
import { UploadIcon } from "@/components/Icon";
import UploadedFile from "@/components/Custom/UploadedFile";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";

const GeneralInformation = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [localFormData, setLocalFormData] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchGeneralInfoData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/general-info/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch general information."
          );
        }

        const data = await response.json();
        setLocalFormData((prevData) => {
          if (JSON.stringify(prevData) !== JSON.stringify(data)) {
            onChange(data);
            return data;
          }
          setHasFetchedData(true);
          return prevData;
        });
      } catch (error) {
        console.error("Error fetching general information data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeneralInfoData();
  }, [token, applicationNo, hasFetchedData]);

  const handleCheckboxChange = (name, value) => {
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData);
  };

  const handleUploadClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleFileChange = (event, fileType) => {
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
              <p className="text-[12px] text-primary font-medium">{`Upload ${title}`}</p>
              <p className="text-[12px] text-[#98A2B3]">
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
              onChange={(event) => handleFileChange(event, fileType)} // Handle file change
              accept=".pdf, docx, .doc, .png, .jpg, .jpeg"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div>
        <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4 mt-5">
          {/* Render OptionsComponent for each experience */}
          {[
            { title: "Plate Waiting", key: "plateWaiting" },
            { title: "Retail Cashier", key: "retailCashier" },
            { title: "Bar Work", key: "barWork" },
            { title: "Hospitality", key: "hospitality" },
            { title: "Food Service", key: "foodService" },
            { title: "Barista", key: "barista" },
            {
              title: "Supervising / Managing Staff",
              key: "supervising",
            },
          ].map(({ title, key }) => (
            <OptionsComponent
              key={key}
              title={title}
              isCheckedLeft={localFormData[key] === "true"} // "Yes" for true
              setIsCheckedLeft={() => handleCheckboxChange(key, "true")}
              isCheckedRight={localFormData[key] === "false"} // "No" for false
              setIsCheckedRight={() => handleCheckboxChange(key, "false")}
              idLeft={`${key}Left`}
              idRight={`${key}Right`}
            />
          ))}
        </div>
        <div className="w-full mt-5">
          <p className="text-[12px] md:text-[14px] font-medium text-[#475467]">
            Do you have any of the below qualifications/documents? (please state
            yes or no)
          </p>
          <div className="w-full flex flex-col gap-4 mt-4">
            <OptionsComponent
              title="Level 2 Food Hygiene Certificate"
              isCheckedLeft={
                localFormData.level2FoodHygieneCertificate === "true"
              }
              setIsCheckedLeft={() =>
                handleCheckboxChange("level2FoodHygieneCertificate", "true")
              }
              isCheckedRight={
                localFormData.level2FoodHygieneCertificate === "false"
              }
              setIsCheckedRight={() =>
                handleCheckboxChange("level2FoodHygieneCertificate", "false")
              }
              idLeft="FoodHygieneLeft"
              idRight="FoodHygieneRight"
            />
            {(localFormData.level2FoodHygieneCertificate === "true" ||
              localFormData.level2FoodHygieneCertificateUpload) &&
              renderUploadSection(
                "level2FoodHygieneCertificateUpload",
                "Food Hygiene Certificate",
                "fileInputFoodHygiene"
              )}

            <OptionsComponent
              title="Personal License Holder"
              isCheckedLeft={localFormData.personalLicenseHolder === "true"}
              setIsCheckedLeft={() =>
                handleCheckboxChange("personalLicenseHolder", "true")
              }
              isCheckedRight={localFormData.personalLicenseHolder === "false"}
              setIsCheckedRight={() =>
                handleCheckboxChange("personalLicenseHolder", "false")
              }
              idLeft="PersonalLicenseLeft"
              idRight="PersonalLicenseRight"
            />
            {(localFormData.personalLicenseHolder === "true" ||
              localFormData.personalLicenseCertificateUpload) &&
              renderUploadSection(
                "personalLicenseCertificateUpload",
                "Personal License",
                "fileInputPersonalLicense"
              )}

            <OptionsComponent
              title="DBS - Disclosure and Barring Service"
              isCheckedLeft={
                localFormData.dbsDisclosureAndBarringService === "true"
              }
              setIsCheckedLeft={() =>
                handleCheckboxChange("dbsDisclosureAndBarringService", "true")
              }
              isCheckedRight={
                localFormData.dbsDisclosureAndBarringService === "false"
              }
              setIsCheckedRight={() =>
                handleCheckboxChange("dbsDisclosureAndBarringService", "false")
              }
              idLeft="DBSLeft"
              idRight="DBSRight"
            />
            {(localFormData.dbsDisclosureAndBarringService === "true" ||
              localFormData.dbsCertificateUpload) &&
              renderUploadSection(
                "dbsCertificateUpload",
                "DBS",
                "fileInputDBS"
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInformation;
