import { FC } from "react";
import PersonalDetails from "@/components/onboardingForm/PersonalDetails";
import ContactDetails from "@/components/onboardingForm/ContactDetails";
import GeneralInformation from "@/components/onboardingForm/GeneralInformation";
import NextOfKinDetails from "@/components/onboardingForm/NextOfKin";
import AgreementToReportInfection from "@/components/onboardingForm/AgreementToReport";
import EducationalDetails from "@/components/onboardingForm/EducationalDetails";
import ReferenceDetails from "@/components/onboardingForm/Reference";
import FoodSafetyQuestionnaire from "@/components/onboardingForm/FoodSafetyQuestionnaire";
import LicenseRegulatory from "@/components/onboardingForm/LicenseRegulatory";
import HealthAndDisability from "@/components/onboardingForm/HealthAndDisability";
import BankDetails from "@/components/onboardingForm/BankDetails";
import AgreementConsent from "@/components/onboardingForm/AgreementConsent";

const OnboardingStepContent = ({
  currentStep,
  formData,
  handleFormChange,
  steps,
}) => {
  const currentStepName = steps[currentStep].label;

  const renderStepContent = () => {
    switch (currentStepName) {
      case "Personal Details":
        return (
          <PersonalDetails
            onChange={handleFormChange}
            // formData={formData.personalDetails}
          />
        );
      case "Contact Details":
        return (
          <ContactDetails
            onChange={handleFormChange}
            // formData={formData.contactDetails}
          />
        );
      case "General Information":
        return (
          <GeneralInformation
            // formData={formData.generalInfo || {}}
            onChange={handleFormChange}
          />
        );
      case "Emergency Details":
        return (
          <NextOfKinDetails
            onChange={handleFormChange}
            // formData={formData.nextOfKin}
          />
        );

      case "Reference Details":
        return (
          <ReferenceDetails
            onChange={handleFormChange}
            // formData={formData.reference}
          />
        );

      case "Educational Details":
        return (
          <EducationalDetails
            onChange={handleFormChange}
            // formData={formData.educationalDetails}
          />
        );
      case "Health and Disability":
        return (
          <HealthAndDisability
            onChange={handleFormChange}
            // formData={formData.healthAndDisability}
          />
        );
      case "Agreement to Report Infection":
        return (
          <AgreementToReportInfection
            onChange={handleFormChange}
            // formData={formData.healthAndDisability}
          />
        );

      case "Food Safety Questionnaire":
        return (
          <FoodSafetyQuestionnaire
            onChange={handleFormChange}
            // formData={formData.foodSafetyQuestionnaire}
          />
        );

      case "Licensing Regulation":
        return (
          <LicenseRegulatory
            onChange={handleFormChange}
            // formData={formData.foodSafetyQuestionnaire}
          />
        );

      case "Bank Details":
        return (
          <BankDetails
            onChange={handleFormChange}
            // formData={formData.bankDetails}
          />
        );
      case "48 Hours Opt-out Agreement":
        return (
          <AgreementConsent
            onChange={handleFormChange}
            // formData={formData.agreementConsent}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderStepContent()}</div>;
};

export default OnboardingStepContent;