// utils/validateStepData.ts

interface FormData {
    personalDetails?: any;
    contactDetails?: any;
    generalInfo?: any;
    nextOfKin?: any;
    referenceDetails?: any;
    educationalDetails?: any;
    healthDisability?: any;
    agreementToReportInfection?: any;
    foodSafetyQuestionnaire?: any;
    licensingRegulation?: any;
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
      { label: "Terms of Engagement" },
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
          errors.plateWaiting = "Please answer Yes or No for plateWaiting question";
          isValid = false;
        }
        if (!formData.generalInfo?.retailCashier) {
          errors.retailCashier = "Please answer Yes or No for retailCashier question";
          isValid = false;
        }
        if (!formData.generalInfo?.barWork) {
          errors.barWork = "Please answer Yes or No for bar work question";
          isValid = false;
        }
        if (!formData.generalInfo?.hospitality) {
          errors.hospitality = "Please answer Yes or No for hospitality  question";
          isValid = false;
        }

        if (!formData.generalInfo?.foodService) {
          errors.foodService = "Please answer Yes or No for food and service question";
          isValid = false;
        }

        if (!formData.generalInfo?.barista) {
          errors.barista = "Please answer Yes or No for barista question";
          isValid = false;
        }
        if (!formData.generalInfo?.supervising) {
          errors.supervising = "Please answer Yes or No for Supervising / managing staff question";
          isValid = false;
        }
        if (!formData.generalInfo?.level2FoodHygieneCertificate) {
          errors.level2FoodHygieneCertificate = "Please answer Yes or No for level 2 food hygiene certificate question";
          isValid = false;
        }

        if (!formData.generalInfo?.personalLicenseHolder) {
          errors.personalLicenseHolder = "Please answer Yes or No for personal license holder question";
          isValid = false;
        }

        if (!formData.generalInfo?.dbsDisclosureAndBarringService) {
          errors.dbsDisclosureAndBarringService = "Please answer Yes or No for dbs Disclosure And Barring Service question";
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
        if (!formData.agreementToReportInfection?.agreementToReportInfection || formData.agreementToReportInfection?.agreementToReportInfection == undefined || null) {
          errors.gpName = "Please certify before you proceed";
          isValid = false;
        }
        break;

      case "Food Safety Questionnaire":
        if (formData.foodSafetyQuestionnaire?.cleaningRawMeatUtensilsRequired == undefined || null) {
          errors.cleaningRawMeatUtensilsRequired = "cleaning raw meat utensils question is required";
          isValid = false;
        }
        break;

      case "Licensing Regulation":
        if (!formData.licensingRegulation?.licensingRegulationAgreement || formData.licensingRegulation?.licensingRegulationAgreement == undefined || null) {
          errors.gpAddress = "Please certify before you proceed";
          isValid = false;
        }
        break;
                
        
      case "Bank Details":
        // console.log("Bank", formData)
        if (formData.bankDetails?.bankName == "") {
          errors.bankName = "Bank name is required";
          isValid = false;
        }
        if (formData.bankDetails?.accountNumber == "") {
          errors.accountNumber = "Account number is required";
          isValid = false;
        }
        if (formData.bankDetails?.sortCode == "") {
          errors.sortCode = "Sort code is required";
          isValid = false;
        }

        if (formData.bankDetails?.accountName == "") {
          errors.accountName = "Account Name is required";
          isValid = false;
        }
        
        if (!formData.bankDetails?.employmentStatusDeclaration || formData.bankDetails?.employmentStatusDeclaration == "") {
          errors.employmentStatusDeclaration = "Employment Status Declaration is required";
          isValid = false;
        }

        // if (!formData.bankDetails?.studentLoanStatus || formData.bankDetails?.studentLoanStatus == "") {
        //   errors.studentLoanStatus = "Student loan status is required";
        //   isValid = false;
        // }


        if (!formData.bankDetails?.p45Attached || formData.bankDetails?.p45Attached == null) {
          errors.p45Attached = "P45 attached status declaration is required";
          isValid = false;
        }
      
        break;
  
      case "Terms of Agreement":    
      // console.log("validate", formData.agreementConsent);    
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
  