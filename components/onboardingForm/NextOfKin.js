import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import PrimarySelect from "@/components/Custom/Select/PrimarySelect";

const NextOfKinDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [localFormData, setLocalFormData] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [relationship, setRelationship] = useState(""); // State for relationship

  useEffect(() => {
    setIsMounted(true);

    const fetchContactData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/next-of-kin/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch contact data.");
        }

        const data = await response.json();
        setLocalFormData(data);
        setRelationship(data.relationship || ""); // Set initial relationship if available
        onChange(data);
        setHasFetchedData(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, [token, applicationNo, hasFetchedData, onChange]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData); // Notify parent component
  };

  return (
    <div>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className={`w-full flex flex-col gap-1`}>
          <PrimaryInput
            id="firstName"
            label="First Name"
            type="text"
            name="firstName"
            isRequired
            value={localFormData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className={`w-full flex flex-col gap-1`}>
          <PrimaryInput
            id="lastName"
            label="Last Name"
            type="text"
            name="lastname"
            isRequired
            value={localFormData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>

        {/* Relationship */}
        <div className={`w-full flex flex-col gap-1`}>
          <PrimarySelect
            label="Select relationship"
            id="relationship"
            options={["Parent", "Family Member", "Friend", "Partner", "Other"]}
            initialValue="-- Select Relationship --"
            value={relationship} // Use the relationship state
            required // Transfer required prop
            onChange={(e) => {
              const selectedValue = e.target.value; // Get the selected value
              setRelationship(selectedValue); // Update relationship state
              setLocalFormData((prev) => ({
                ...prev,
                relationship: selectedValue, // Update relationship in form data
              }));
              onChange({ ...localFormData, relationship: selectedValue }); // Notify parent component
            }}
          />
        </div>

        {/* Phone Number */}
        <div className={`w-full flex flex-col gap-1`}>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mt-1"
          >
            Phone Number
          </label>
          <PhoneInput
            country={"gb"}
            value={localFormData?.phoneNumber}
            onChange={(value) =>
              handleChange({ target: { name: "phoneNumber", value } })
            }
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

        {/* Email */}
        <div className={`w-full flex flex-col gap-1`}>
          <PrimaryInput
            required
            label="Email"
            type="email"
            name="email"
            value={localFormData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Address */}
        <div className={`w-full flex flex-col gap-1`}>
          <PrimaryInput
            required
            label="Address"
            type="text"
            name="address"
            value={localFormData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default NextOfKinDetails;
