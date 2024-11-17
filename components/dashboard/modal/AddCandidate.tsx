import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../Icon";
import PrimaryInput from "../../Custom/Inputs/PrimaryInput";
import InputError from "../../../utils/InputError";
import SubmitBtn from "../../Custom/Buttons/SubmitBtn";
import { useSessionContext } from "@/context/SessionContext";
import { useAddUser, useFetchTags } from "@/hooks/useUserProfile"; // Make sure the hook is imported correctly

interface AddCandidateProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const AddCandidate: React.FC<AddCandidateProps> = ({ isOpen, onClose }) => {
  const { token } = useSessionContext();
  const { tags, isLoading, error } = useFetchTags(token); // Use the custom hook
  console.log("All tags", tags);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedTags: [] as string[],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, selectedTags: selectedOptions });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        password: "",
        accountStatus: false,
        role: "applicant",
        createdBy: "admin",
      };

      await useAddUser(payload, token);
      toast.success("Candidate added successfully");
      setFormData({ firstName: "", lastName: "", email: "", selectedTags: [] });
      onClose();
    } catch (error: any) {
      console.error("Error adding candidate:", error);
      toast.error(
        error.message || "An error occurred while adding the candidate."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Candidate</h2>
          <button onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <PrimaryInput
              label="First Name*"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            <div className="h-2">
              {errors.firstName && (
                <InputError errorMessage={errors.firstName} />
              )}
            </div>
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
            <div className="h-2">
              {errors.lastName && <InputError errorMessage={errors.lastName} />}
            </div>
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
            <div className="h-2">
              {errors.email && <InputError errorMessage={errors.email} />}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <select
              name="selectedTags"
              multiple
              value={formData.selectedTags}
              onChange={handleTagSelection}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {isLoading ? (
                <option>Loading...</option>
              ) : (
                <>
                  {tags?.location && tags.location.length > 0 && (
                    <optgroup label="Locations:">
                      {tags.location.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {tags.group && tags.group.length > 0 && (
                    <optgroup label="Groups">
                      {tags.group.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {tags.employmentType && tags.employmentType.length > 0 && (
                    <optgroup label="Employment Types">
                      {tags.employmentType.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {tags.jobTitle && tags.jobTitle.length > 0 && (
                    <optgroup label="Job Titles">
                      {tags.jobTitle.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </>
              )}
            </select>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          <div className="py-6 w-full">
            <SubmitBtn
              text={isSubmitting ? "Processing..." : "Confirm"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
