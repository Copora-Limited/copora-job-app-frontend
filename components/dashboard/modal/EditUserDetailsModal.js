import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CustomModal from "./CustomModal";
import { useSessionContext } from "@/context/SessionContext";
import TagSelect from "@/components/TagSelect";

import {
  useUserProfile,
  useContactDetails,
  useUpdateUserProfile,
  useFetchTags,
} from "@/hooks/useUserProfile";

const EditUserDetailsModal = ({ id, isOpen, onClose }) => {
  const { token } = useSessionContext();
  const { tags = {} } = useFetchTags(token);

  const {
    userData,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile(id, token);

  const [isLoading, setIsLoading] = useState(false);

  // Form state for each field
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    selectedTags: [],
  });

  //   console.log("All data", userData);
  // Pre-fill form fields when user data is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        id: id || "", // Set the id here
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        selectedTags: userData.tags
          ? userData.tags.map((tag) => ({ value: tag, label: tag })) // Map user tags into expected format
          : [],
      });
    }
  }, [userData]);

  // console.log("userData", userData);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatTags = (tagGroup) =>
    Array.isArray(tagGroup)
      ? tagGroup.map((tag) => ({ value: tag.name, label: tag.name }))
      : [];

  const items = [
    ...(tags.location ? formatTags(tags.location) : []),
    ...(tags.group ? formatTags(tags.group) : []),
    ...(tags.employmentType ? formatTags(tags.employmentType) : []),
    ...(tags.jobTitle ? formatTags(tags.jobTitle) : []),
  ];

  const handleTagsChange = (selectedItems) => {
    setFormData((prev) => ({ ...prev, selectedTags: selectedItems }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tags = formData.selectedTags.map((tag) => tag.value);

      // Create the payload, excluding selectedTags
      const { selectedTags, ...otherFields } = formData; // Exclude selectedTags
      const payload = {
        ...otherFields,
        tags, // Add tags array
      };

      await useUpdateUserProfile(payload, token);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Edit Candidate Data</h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="block w-full mt-1 mb-3 p-2 border rounded"
        />

        {/* <label className="block text-sm font-medium text-gray-700">
          Middile Name
        </label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          className="block w-full mt-1 mb-3 p-2 border rounded"
        /> */}

        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="block w-full mt-1 mb-3 p-2 border rounded"
        />

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full mt-1 mb-3 p-2 border rounded"
        />

        {/* Tag Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <TagSelect
            items={items} // All available tags
            selectedTags={formData.selectedTags} // Pre-selected tags
            onTagsChange={handleTagsChange} // Update selected tags
          />
        </div>
        

        <button
          type="submit"
          className={`w-full h-[44px] mt-6 flex items-center justify-center gap-2 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn ${
            isLoading ? "bg-gray-400" : "bg-appGreen hover:bg-teal-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </CustomModal>
  );
};

export default EditUserDetailsModal;
