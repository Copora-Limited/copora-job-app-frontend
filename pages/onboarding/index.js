import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { toast } from "react-toastify";
import OnboardingStepContent from "./OnboardingStepContent";
import OnboardingTopNav from "@/components/OnboardingTopNav";
import AsideLeft from "@/components/OnboardingAsideLeft";
import Alert from "@/components/Custom/Alert";
import validateStepData from "@/utils/validateStepData";
// import {Spin} from "antd";

export default function OnboardingLayout() {
  const [isSaving, setIsSaving] = useState(false); // Added isSaving state
  const { data: session, status } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;
  const username = session?.user?.name;
  const router = useRouter();
  const { step } = router.query;
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState(null);

  // Check for session and redirect if necessary
  useEffect(() => {
    if (status === "loading") return; // Avoid redirecting while loading

    // Redirect to login if the session or token is missing
    if (!session || !session.user?.token) {
      router.push("/auth/login");
    }
  }, [session, status, router]);

  const steps = [
    {
      label: "Personal Details",
      message: "Enter your personal information accurately.",
      description:
        "Provide your full name, date of birth, and identification details.",
    },
    {
      label: "Contact Details",
      message: "Add your current contact information.",
      description:
        "Fill in your phone number, email address, and home address.",
    },
    {
      label: "General Information",
      message: "Provide general background information.",
      description:
        "Share your previous experience or other relevant background on your profile.",
    },
    {
      label: "Emergency Details",
      message: "Provide emergency contact information.",
      description:
        "Enter contact information of someone who can be reached in case of emergency.",
    },
    {
      label: "Reference Details",
      message: "List references from previous work or character referees.",
      description:
        "Provide a minimum of two professional references or, if unavailable, two character references.",
    },
    {
      label: "Educational Details",
      message: "Outline your educational background.",
      description:
        "Include information about your academic qualifications and achievements.",
    },
    {
      label: "Health and Disability",
      message: "Disclose any relevant health and disability information.",
      description:
        "Provide any necessary health or disability details to support workplace accommodations.",
    },
    {
      label: "Agreement to Report Infection",
      message: "Acknowledge the importance of reporting infections.",
      description:
        "Review and confirm your understanding of infection reporting procedures.",
    },
    {
      label: "Food Safety Questionnaire",
      message: "Complete the food safety questionnaire.",
      description:
        "Answer questions about food safety knowledge and practices.",
    },
    {
      label: "Licensing Regulation",
      message: "Agree to licensing and regulatory terms.",
      description:
        "Review the document and confirm your compliance with licensing regulations.",
    },
    {
      label: "Bank Details",
      message: "Provide your bank account details.",
      description:
        "Fill in your bank name, account number, and sort code for payroll processing.",
    },
    {
      label: "48 Hours Opt-out Agreement",
      message: "Review and consider the 48-hour workweek opt-out.",
      description:
        "Indicate whether you consent to work more than 48 hours per week.",
    },
  ];

  const stepEndpoints = [
    "personal-details",
    "contact-details",
    "general-info",
    "next-of-kin",
    "reference",
    "educational-details",
    "health-and-disability",
    "agreement-to-report-infection",
    "food-safety-questionnaire",
    "licensing-regulation",
    "bank-details",
    "agreement-consent",
  ];

  useEffect(() => {
    if (step) {
      const stepIndex = parseInt(step, 10) - 1;
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
      }
    }
  }, [step]);

  const handleSaveAndNext = async () => {
    const stepName = stepEndpoints[currentStep];
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${stepName}`;
    const camelCaseStepName = stepName
      .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
      .replace(/-/g, "");

    console.log("stepName", stepName);
    console.log("camelCaseStepName", camelCaseStepName);

    // Validate step data
    const { isValid, errors } = validateStepData(currentStep, formData);
    console.table("New formData", formData[camelCaseStepName]);
    // console.log(JSON.stringify(myObject, null, 2));

    // Handle validation errors
    if (!isValid) {
      setValidationErrors(errors);
      toast.error("Validation failed. Please check your input.");
      return;
    } else {
      setValidationErrors(""); // Clear previous validation errors
    }

    const stepData =
      formData[camelCaseStepName] || formData[stepName.replace(/-/g, "")];

    console.log("New formData", formData[camelCaseStepName]);

    try {
      setIsSaving(true);

      if (!token) {
        toast.error("User session is not available. Please log in again.");
      }

      let body;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (["personal-details", "general-info"].includes(stepName)) {
        const formData = new FormData();

        for (const key in stepData) {
          if (
            key !== "id" &&
            stepData[key] !== null &&
            stepData[key] !== "null"
          ) {
            if (stepData[key] instanceof File) {
              formData.append(key, stepData[key]);
            } else {
              formData.append(key, stepData[key].toString());
            }
          }
        }
        if (!formData.has("applicationNo")) {
          formData.append("applicationNo", applicationNo);
          // toast.success("Application number Appended.");
        }

        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          ...stepData,
          applicationNo,
        });
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        // throw new Error(errorData.message || "An error occurred.");
        toast.error(errorData.message);
        setIsSaving(false);
        return; // Prevent submission
      }

      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/update-onboarding-step`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            onboardingStep: currentStep + 1,
            applicationNo: applicationNo,
          }),
        }
      );

      if (currentStep === steps.length - 1) {
        toast.success("Onboarding complete! Redirecting...");
        router.push("/onboarding/congratulations");
      } else {
        toast.success("Step saved successfully!");
        handleNext();
      }

      setError(null);
      setValidationErrors(null);
    } catch (err) {
      console.error("Error saving data:", err);
      setError(err.message || "An error occurred.");
      toast.error(`Failed to save: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    router.push(`/onboarding?step=${nextStep + 1}`, undefined, {
      shallow: true,
    });
    setCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    router.push(`/onboarding?step=${prevStep + 1}`, undefined, {
      shallow: true,
    });
    setCurrentStep(prevStep);
  };

  const handleFormChange = (data) => {
    const currentStepName = stepEndpoints[currentStep];
    const camelCaseStepName = currentStepName
      .split("-")
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");

    setFormData((prev) => {
      const currentFormData = prev[camelCaseStepName] || {};

      // Check if applicationNo exists in the current form data
      if (data.applicationNo && currentFormData.applicationNo) {
        console.log("ApplicationNo already set");
        // Do nothing if applicationNo already exists
        return prev;
      }

      return {
        ...prev,
        [camelCaseStepName]: {
          ...currentFormData,
          ...data,
          // Append applicationNo if it doesn't exist
          applicationNo: applicationNo || data.applicationNo || null,
        },
      };
    });

    console.log("show new data set in camelCaseStepName", formData);
  };

  return (
    <div className="w-screen h-screen flex md:flex-row flex-col bg-white">
      <AsideLeft
        steps={steps.map((step) => step.label)}
        stepMessages={steps.map((step) => step.message)}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <div className="md:w-3/4 w-screen h-full">
        <OnboardingTopNav />
        <div className="w-full h-[92vh] mt-[9vh] overflow-y-auto scroller">
          <div className="md:w-4/5 w-[90%] mx-auto">
            <div className="w-full my-5">
              <h4 className="md:text-[18px] text-[16px] font-medium my-3 capitalize">
                Welcome {username}
              </h4>

              <h5 className="md:text-[18px] text-[16px] font-medium text-[#101828]">
                {steps[currentStep]?.label}
              </h5>
              <p className="md:text-[14px] text-[12px] text-[#475467] font-azoSansRegular">
                {steps[currentStep]?.description}
              </p>
            </div>

            <OnboardingStepContent
              currentStep={currentStep}
              formData={formData}
              handleFormChange={handleFormChange}
              steps={steps}
            />
            {error && <Alert message={error} />}
            {validationErrors && <Alert message={validationErrors} />}
            <div className="flex justify-between  my-10">
              {/* <div> */}
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="w-full mr-5 bg-gray-300 px-4 py-2 rounded-full"
              >
                Previous
              </button>
              {/* </div> */}

              {/* <div> */}
              {[7, 9].includes(currentStep) ? ( // Check if current step is Health and Disability
                <button
                  onClick={handleNext}
                  disabled={isSaving}
                  className="w-full bg-teal-600 me-4 hover:bg-teal-700 transition duration-500 text-white border border-[#667080] px-4 py-2 rounded-full"
                >
                  Save & Next
                </button>
              ) : (
                // w-full h-[44px] flex items-center justify-center gap-2 bg-appGreen hover:bg-teal-700 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px]
                <button
                  onClick={handleSaveAndNext}
                  disabled={isSaving}
                  className="w-full bg-teal-600 hover:bg-teal-700 transition duration-500 text-white border border-[#667080] px-4 py-2 rounded-full"
                >
                  {isSaving
                    ? "Saving..."
                    : currentStep === steps.length - 1
                    ? "Submit"
                    : "Save & Next"}
                </button>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
