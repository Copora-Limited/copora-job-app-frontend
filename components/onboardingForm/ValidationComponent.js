// components/onboarding/ValidationComponent.tsx
import React from "react";

const ValidationComponent = ({
  currentStep,
  formData,
  steps,
  setValidationErrors,
}) => {
  const validateStepData = () => {
    const currentStepData = steps[currentStep]; // Get the current step object
    let isValid = true;
    let errors = {};

    switch (currentStepData.label) {
      case "Personal Details":
        if (!formData.personalDetails?.dateOfBirth) {
          errors.dateOfBirth = "Date of Birth is required";
          isValid = false;
        }
        if (!formData.personalDetails?.nationalInsuranceNumber) {
          errors.nationalInsuranceNumber =
            "National InsuranceNumber is required";
          isValid = false;
        }
        break;

      case "Contact Details":
        if (!formData.contactDetails?.email) {
          errors.email = "Email is required";
          isValid = false;
        }
        if (!formData.contactDetails?.phone) {
          errors.phone = "Phone number is required";
          isValid = false;
        }
        break;

      case "General Information":
        if (!formData.generalInfo?.gender) {
          errors.gender = "Gender is required";
          isValid = false;
        }
        break;

      case "Emergency Details":
        if (!formData.emergencyDetails?.contactName) {
          errors.contactName = "Emergency contact name is required";
          isValid = false;
        }
        if (!formData.emergencyDetails?.contactNumber) {
          errors.contactNumber = "Emergency contact number is required";
          isValid = false;
        }
        break;

      case "Reference Details":
        if (!formData.referenceDetails?.referenceName) {
          errors.referenceName = "Reference name is required";
          isValid = false;
        }
        break;

      case "Educational Details":
        if (!formData.educationalDetails?.highestQualification) {
          errors.highestQualification = "Highest qualification is required";
          isValid = false;
        }
        break;

      case "Food Safety Questionnaire":
        if (!formData.foodSafety?.foodAllergies) {
          errors.foodAllergies = "Food allergies information is required";
          isValid = false;
        }
        break;

      case "Health and Disability":
        if (!formData.healthDisability?.healthStatus) {
          errors.healthStatus = "Health status is required";
          isValid = false;
        }
        break;

      case "Bank Details":
        if (!formData.bankDetails?.accountNumber) {
          errors.accountNumber = "Account number is required";
          isValid = false;
        }
        if (!formData.bankDetails?.bankName) {
          errors.bankName = "Bank name is required";
          isValid = false;
        }
        break;

      case "Agreement Consent":
        if (!formData.agreement?.isAgreed) {
          errors.agreement = "You must agree to the terms";
          isValid = false;
        }
        break;

      default:
        break;
    }

    setValidationErrors(Object.values(errors).join(", "));
    return isValid;
  };

  return <>{validateStepData()}</>;
};

export default ValidationComponent;
