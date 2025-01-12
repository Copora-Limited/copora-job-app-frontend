import React, { useState, useEffect } from "react";
import { useSelect, useMultipleSelection } from "downshift";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "@/components/Icon";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import InputError from "@/utils/InputError";
import SubmitBtn from "@/components/Custom/Buttons/SubmitBtn";
import { useSessionContext } from "@/context/SessionContext";
import { useAddUser, useFetchTags } from "@/hooks/useUserProfile";

const AddCandidate = ({ isOpen, onClose }) => {
  const { token } = useSessionContext();
  const { tags, isLoading, error } = useFetchTags(token);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    selectedTags: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectedItemsChange = (selectedItems) => {
    setFormData({ ...formData, selectedTags: selectedItems });
  };

  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    selectedItems: formData.selectedTags,
    onSelectedItemsChange: ({ selectedItems }) =>
      handleSelectedItemsChange(selectedItems),
  });

  const {
    isOpen: menuOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: [
      ...formatTags(tags.location || []),
      ...formatTags(tags.group || []),
      ...formatTags(tags.employmentType || []),
      ...formatTags(tags.jobTitle || []),
    ],
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem && !selectedItems.includes(selectedItem)) {
        addSelectedItem(selectedItem);
      }
    },
    itemToString: (item) => (item ? item.label : ""),
  });

  const formatTags = (tagGroup) =>
    tagGroup.map((tag) => ({ value: tag.name, label: tag.name }));

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
    } catch (error) {
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
            <div {...getDropdownProps({ preventKeyAction: menuOpen })}>
              <button
                type="button"
                {...getToggleButtonProps()}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              >
                {menuOpen ? "Close" : "Select Tags"}
              </button>
            </div>
            <ul
              {...getMenuProps()}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              {menuOpen &&
                [
                  ...formatTags(tags.location || []),
                  ...formatTags(tags.group || []),
                  ...formatTags(tags.employmentType || []),
                  ...formatTags(tags.jobTitle || []),
                ].map((item, index) => (
                  <li
                    key={item.value}
                    {...getItemProps({ item, index })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "#bde4ff" : "white",
                      fontWeight: selectedItems.includes(item)
                        ? "bold"
                        : "normal",
                    }}
                  >
                    {item.label}
                  </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedItems.map((selectedItem, index) => (
                <div
                  key={`selected-item-${index}`}
                  className="flex items-center bg-gray-200 rounded p-1"
                >
                  {selectedItem.label}
                  <button
                    type="button"
                    onClick={() => removeSelectedItem(selectedItem)}
                    className="ml-2 text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
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
