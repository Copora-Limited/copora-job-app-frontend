import React, { useState, useEffect } from "react";
import OptionsComponent from "@/components/GeneralInformation/OptionComponent";
import { UploadIcon } from "@/components/Icon"; // Ensure this matches the named export

const GeneralInformation = ({ formData, onChange }) => {
  const [localFormData, setLocalFormData] = useState({
    plateWaiting: false,
    retailCashier: false,
    barWork: false,
    hospitality: false,
    foodService: false,
    barista: false,
    supervisingManagingStaff: false,
    foodHygieneCertificate: false,
    personalLicenseHolder: false,
    dbs: false,
    ...formData,
  });

  useEffect(() => {
    setLocalFormData((prevData) => ({
      ...prevData,
      ...formData,
    }));
  }, [formData]);

  const handleCheckboxChange = (name, value) => {
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData);
  };

  // Handle file upload
  const handleUploadClick = () => {
    // Trigger file input
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      setLocalFormData((prevData) => ({
        ...prevData,
        [fileType]: file,
      }));
    }
  };

  return (
    <div className="w-full h-full">
      <div>
        <div className="mt-3">
          <h5 className="md:text-[18px] text-[16px] font-medium text-primary">
            General Information
          </h5>
          <p className="md:text-[14px] text-[12px] text-[#475467]">
            Share where you’ve worked on your profile.
          </p>
          <p className="md:text-[14px] text-[12px] text-[#475467] font-medium mt-3">
            Do you have experience in any of the following: (please state yes or
            no)
          </p>
        </div>

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
              key: "supervisingManagingStaff",
            },
          ].map(({ title, key }) => (
            <OptionsComponent
              key={key}
              title={title}
              isCheckedLeft={localFormData[key]}
              setIsCheckedLeft={() => handleCheckboxChange(key, true)}
              isCheckedRight={!localFormData[key]}
              setIsCheckedRight={() => handleCheckboxChange(key, false)}
              idLeft={`${key}Left`}
              idRight={`${key}Right`}
            />
          ))}
        </div>

        <div className="mt-5">
          <p className="md:text-[14px] text-[12px] text-[#475467] font-medium">
            Do you have any of the below qualifications/documents? (please state
            yes or no)
          </p>

          <OptionsComponent
            title="Level 2 Food Hygiene Certificate"
            isCheckedLeft={localFormData.foodHygieneCertificate === true}
            setIsCheckedLeft={() =>
              handleCheckboxChange("foodHygieneCertificate", true)
            }
            isCheckedRight={localFormData.foodHygieneCertificate === false}
            setIsCheckedRight={() =>
              handleCheckboxChange("foodHygieneCertificate", false)
            }
            idLeft="FoodHygieneLeft"
            idRight="FoodHygieneRight"
          />

          {localFormData.foodHygieneCertificate && (
            <div
              className="w-full md:h-[75px] h-[60px] border-dashed border border-[#D0D5DD] rounded-[10px] px-5 mt-3 flex items-center justify-between gap-3 transition-all duration-500 hover:border-appGreen cursor-pointer"
              onClick={() => handleUploadClick("fileInputFoodHygiene")} // Trigger file input for Food Hygiene
            >
              <UploadIcon />
              <div>
                <p className="text-[12px] text-primary font-medium">
                  Upload Food Hygiene Certificate
                </p>
                <p className="text-[12px] text-[#98A2B3]">
                  SVG, PNG, JPG, GIF | 10MB max.
                </p>
              </div>
              <div className="w-[80px] h-[36px] flex items-center justify-center bg-teal-700 text-white text-[14px] rounded-[6px]">
                Upload
              </div>
              <input
                type="file"
                id="fileInputFoodHygiene"
                className="hidden"
                onChange={(event) =>
                  handleFileChange(event, "uploadedFoodHygieneFile")
                }
                accept=".svg,.png,.jpg,.gif"
              />
            </div>
          )}

          <OptionsComponent
            title="Personal License Holder"
            isCheckedLeft={localFormData.personalLicenseHolder === true}
            setIsCheckedLeft={() =>
              handleCheckboxChange("personalLicenseHolder", true)
            }
            isCheckedRight={localFormData.personalLicenseHolder === false}
            setIsCheckedRight={() =>
              handleCheckboxChange("personalLicenseHolder", false)
            }
            idLeft="PersonalLicenseLeft"
            idRight="PersonalLicenseRight"
          />

          {localFormData.personalLicenseHolder && (
            <div
              className="w-full md:h-[75px] h-[60px] border-dashed border border-[#D0D5DD] rounded-[10px] px-5 mt-3 flex items-center justify-between gap-3 transition-all duration-500 hover:border-appGreen cursor-pointer"
              onClick={() => handleUploadClick("fileInputPersonalLicense")} // Trigger file input for Personal License
            >
              <UploadIcon />
              <div>
                <p className="text-[12px] text-primary font-medium">
                  Upload Personal License
                </p>
                <p className="text-[12px] text-[#98A2B3]">
                  SVG, PNG, JPG, GIF | 10MB max.
                </p>
              </div>
              <div className="w-[80px] h-[36px] flex items-center justify-center bg-teal-700 text-white text-[14px] rounded-[6px]">
                Upload
              </div>
              <input
                type="file"
                id="fileInputPersonalLicense"
                className="hidden"
                onChange={(event) =>
                  handleFileChange(event, "uploadedPersonalLicenseFile")
                }
                accept=".svg,.png,.jpg,.gif"
              />
            </div>
          )}

          <OptionsComponent
            title="DBS - Disclosure and Barring Service"
            isCheckedLeft={localFormData.dbs === true}
            setIsCheckedLeft={() => handleCheckboxChange("dbs", true)}
            isCheckedRight={localFormData.dbs === false}
            setIsCheckedRight={() => handleCheckboxChange("dbs", false)}
            idLeft="DBSLeft"
            idRight="DBSRight"
          />

          {/* Upload Components */}

          {localFormData.dbs && (
            <div
              className="w-full md:h-[75px] h-[60px] border-dashed border border-[#D0D5DD] rounded-[10px] px-5 mt-3 flex items-center justify-between gap-3 transition-all duration-500 hover:border-appGreen cursor-pointer"
              onClick={() => handleUploadClick("fileInputDBS")} // Trigger file input for DBS
            >
              <UploadIcon />
              <div>
                <p className="text-[12px] text-primary font-medium">
                  Upload DBS
                </p>
                <p className="text-[12px] text-[#98A2B3]">
                  SVG, PNG, JPG, GIF | 10MB max.
                </p>
              </div>
              <div className="w-[80px] h-[36px] flex items-center justify-center bg-teal-700 text-white text-[14px] rounded-[6px]">
                Upload
              </div>
              <input
                type="file"
                id="fileInputDBS"
                className="hidden"
                onChange={(event) => handleFileChange(event, "uploadedDBSFile")}
                accept=".svg,.png,.jpg,.gif"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
