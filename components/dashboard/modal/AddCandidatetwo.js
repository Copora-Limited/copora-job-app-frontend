// src/components/AddCandidate.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "@/components/Icon";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import InputError from "@/utils/InputError";
import SubmitBtn from "@/components/Custom/Buttons/SubmitBtn";
import { useSessionContext } from "@/context/SessionContext";
import { useAddUser, useFetchTags } from "@/hooks/useUserProfile";
import TagSelect from "@/components/TagSelect";

const AddCandidate = ({ isOpen, onClose }) => {
  const { token } = useSessionContext();
  const { tags = {} } = useFetchTags(token);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedTags: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (selectedItems) => {
    setFormData({ ...formData, selectedTags: selectedItems });
  };

  const handleClose = () => {
    // Reset the formData state
    setFormData({ firstName: "", lastName: "", email: "", selectedTags: [] });
    // Call the original onClose function
    onClose();
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      // Extract tags from selectedTags
      const tags = formData.selectedTags.map((tag) => tag.value);

      // Create the payload, excluding selectedTags
      const { selectedTags, ...otherFields } = formData; // Exclude selectedTags
      const payload = {
        ...otherFields,
        tags, // Add tags array
        accountStatus: false,
        role: "applicant",
        createdBy: "admin",
      };

      await useAddUser(payload, token);
      toast.success("Candidate added successfully");
      setFormData({ firstName: "", lastName: "", email: "", selectedTags: [] });
      handleClose();
    } catch (error) {
      console.error("Error adding candidate:", error);
      toast.error(
        error.message || "An error occurred while adding the candidate."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Candidate</h2>
          <button onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Input fields */}
          <div>
            <PrimaryInput
              label="First Name*"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            <InputError errorMessage={errors.firstName} />
          </div>
          <div>
            <PrimaryInput
              label="Last Name*"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            <InputError errorMessage={errors.lastName} />
          </div>
          <div>
            <PrimaryInput
              label="Email*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <InputError errorMessage={errors.email} />
          </div>

          {/* Tag Selection */}
          <div>
            <label>Tags</label>
            <TagSelect
              items={items}
              selectedTags={formData.selectedTags}
              onTagsChange={handleTagsChange}
            />
          </div>

          {/* Submit Button */}
          <SubmitBtn
            text={isSubmitting ? "Submitting..." : "Submit"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
