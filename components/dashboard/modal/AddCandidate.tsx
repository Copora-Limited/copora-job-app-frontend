// components/dashboard/modal/AddCandidate.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import { CloseIcon } from "../../Icon";
import PrimaryInput from "../../Custom/Inputs/PrimaryInput";
import InputError from "../../../utils/InputError";
import SubmitBtn from "../../Custom/Buttons/SubmitBtn";
import { useSessionContext } from "@/context/SessionContext";

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        password: "", // Replace with secure logic for production
        accountStatus: false,
        role: "applicant",
        createdBy: "admin", // Adjust this field as needed
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(`${errorResponse.message}`);
      } else {
        toast.success("Candidate added successfully!");
        setFormData({ firstName: "", lastName: "", email: "" }); // Clear form fields on success
      }

      onClose(); // Close the modal after handling submission
    } catch (error: any) {
      console.error("Error adding candidate:", error);
      toast.error(
        error.message || "An error occurred while adding the candidate."
      );
    } finally {
      setIsSubmitting(false);
      setFormData({ firstName: "", lastName: "", email: "" }); // Clear form fields on failure as well
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
