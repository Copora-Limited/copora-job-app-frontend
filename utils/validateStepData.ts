// utils/validateStepData.ts

interface FormData {
    personalDetails?: any;
    contactDetails?: any;
    generalInfo?: any;
    nextOfKin?: any;
    referenceDetails?: any;
    educationalDetails?: any;
    healthDisability?: any;
    agreementToReport?: any;
    foodSafetyQuestionnaire?: any;
    licenseRegulatory?: any;
    bankDetails?: any;
    agreementConsent?: any;
  }
  
  const validateStepData = (currentStep: number, formData: FormData) => {
    const steps = [
      { label: "Personal Details" },
      { label: "Contact Details" },
      { label: "General Information" },
      { label: "Emergency Details" },
      { label: "Reference Details" },
      { label: "Educational Details" },
      { label: "Health and Disability" },
      { label: "Agreement to Report Infection" },
      { label: "Food Safety Questionnaire" },
      { label: "Licensing Regulation"},
      { label: "Bank Details" },
      { label: "48 Hours Opt-out Agreement" },
    ];
  
    const currentStepData = steps[currentStep]; // Get the current step object
    let isValid = true;
    let errors: { [key: string]: string } = {};
  
    switch (currentStepData.label) {
      case "Personal Details":
        if (!formData.personalDetails?.dateOfBirth) {
          errors.dateOfBirth = "Date of Birth is required";
          isValid = false;
        }
        if (formData.personalDetails?.nationalInsuranceNumber == "") {
          errors.nationalInsuranceNumber = "National Insurance Number is required";
          isValid = false;
        }
        break;
  
      case "Contact Details":
        if (!formData.contactDetails?.phone) {
          errors.phone = "Phone number is required";
          isValid = false;
        }
       
        break;
  
      case "General Information":
        console.log("Validate General Info", formData.generalInfo)

        if (!formData.generalInfo?.plateWaiting) {
          errors.plateWaiting = "plateWaiting is required";
          isValid = false;
        }
        if (!formData.generalInfo?.retailCashier) {
          errors.retailCashier = "retailCashier is required";
          isValid = false;
        }
        if (!formData.generalInfo?.supervising) {
          errors.supervising = "supervising is required";
          isValid = false;
        }
        break;
  
      case "Emergency Details":
        console.log("Validate Emergency", formData.nextOfKin)
        if (formData.nextOfKin?.firstName == "") {
          errors.firstName = "Emergency first name is required";
          isValid = false;
        }
        if (formData.nextOfKin?.lastname == "") {
          errors.lastname = "Emergency last name is required";
          isValid = false;
        }
        
        if (formData.nextOfKin?.phoneNumber == "") {
          errors.phoneNumber = "Emergency contact number is required";
          isValid = false;
        }
        break;
  
      case "Reference Details":
        if (formData.referenceDetails?.referenceName == "") {
          errors.referenceName = "Reference name is required";
          isValid = false;
        }
        break;
  
      case "Educational Details":
        if (formData.educationalDetails?.highestQualification == "") {
          errors.highestQualification = "Highest qualification is required";
          isValid = false;
        }
        break;
  
      case "Health and Disability":
        if (formData.healthDisability?.gpName == "") {
          errors.gpName = "Doctor or gp Name is required";
          isValid = false;
        }
        if (formData.healthDisability?.gpAddress == "") {
          errors.gpAddress = "Doctor or gp Address is required";
          isValid = false;
        }
        break;

      case "Agreement to Report Infection":
        break;

      case "Food Safety Questionnaire":
        console.log("Food Safety formData", formData.foodSafetyQuestionnaire.cleaningRawMeatUtensilsRequired)
        
        if (formData.foodSafetyQuestionnaire?.cleaningRawMeatUtensilsRequired == undefined || null) {
          errors.cleaningRawMeatUtensilsRequired = "cleaning raw meat utensils question is required";
          isValid = false;
        }
        break;

      case "Licensing Regulation":
          break;
        
      case "Bank Details":
        console.log("Bank", formData)
        if (formData.bankDetails?.accountNumber == "") {
          errors.accountNumber = "Account number is required";
          isValid = false;
        }
        if (formData.bankDetails?.bankName == "") {
          errors.bankName = "Bank name is required";
          isValid = false;
        }
        break;
  
      case "48 Hours Opt-out Agreement":    
      console.log("validate", formData.agreementConsent);    
        if (formData.agreementConsent?.firstName == "") {
          errors.firstName = "First name is required";
          isValid = false;
        }
        if (formData.agreementConsent?.lastName == "") {
          errors.lastName = "Last name is required";
          isValid = false;
        }

        if (formData.agreementConsent?.address == "") {
          errors.address = "Address is required";
          isValid = false;
        }
        if (formData.agreementConsent?.userConsent == "") {
          errors.userConsent = "You must agree to the terms";
          isValid = false;
        }
        break;
  
      default:
        break;
    }
  
    return { isValid, errors: Object.values(errors).join(", ") };
  };
  
  export default validateStepData;
  