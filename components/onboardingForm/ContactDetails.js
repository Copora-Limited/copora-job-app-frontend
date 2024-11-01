import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const ContactDetails = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [localFormData, setLocalFormData] = useState({});
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const fetchContactData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/contact-details/${applicationNo}`,
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
        onChange(data);
        setHasFetchedData(true); // Only set data once
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, [token, applicationNo, hasFetchedData, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...localFormData, [name]: value };
    setLocalFormData(updatedFormData);
    onChange(updatedFormData);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <PhoneInput
              country={"gb"}
              value={localFormData?.phone}
              onChange={(value) =>
                handleChange({ target: { name: "phone", value } })
              }
              preferredCountries={["uk"]}
              buttonClass="h-full w-fit"
              enableSearch
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

          {/* Address 1 */}
          <div>
            <label
              htmlFor="address_line_1"
              className="block text-sm font-medium text-gray-700"
            >
              Address 1
            </label>
            <input
              required
              type="text"
              name="address_line_1"
              value={localFormData?.address_line_1 || ""}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Address 2 */}
          <div>
            <label
              htmlFor="address_line_2"
              className="block text-sm font-medium text-gray-700"
            >
              Address 2
            </label>
            <input
              required
              type="text"
              name="address_line_2"
              value={localFormData?.address_line_2 || ""}
              onChange={handleChange}
              placeholder="Address 2"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              required
              type="text"
              name="country"
              value={localFormData?.country || ""}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Town */}
          <div>
            <label
              htmlFor="town"
              className="block text-sm font-medium text-gray-700"
            >
              Town
            </label>
            <input
              required
              type="text"
              name="town"
              value={localFormData?.town || ""}
              onChange={handleChange}
              placeholder="Town/City"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>

          {/* Postcode */}
          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-gray-700"
            >
              Postcode
            </label>
            <input
              required
              type="text"
              name="postcode"
              value={localFormData?.postcode || ""}
              onChange={handleChange}
              placeholder="Postcode"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
