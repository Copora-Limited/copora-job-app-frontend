import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PersonalDetails from "@/components/onboarding/PersonalDetails";
import ContactDetails from "@/components/onboarding/ContactDetails";
import GeneralInformation from "@/components/onboarding/GeneralInformation";
import ProfessionalDetails from "@/components/onboarding/ProfessionalDetails";
import EducationalDetails from "@/components/onboarding/EducationalDetails";
import Reference from "@/components/onboarding/Reference";
import FoodSafetyQuestionnaire from "@/components/onboarding/FoodSafetyQuestionnaire";
import HealthAndDisability from "@/components/onboarding/HealthAndDisability";
import BankDetails from "@/components/onboarding/BankDetails";
import AgreementConsent from "@/components/onboarding/AgreementConsent";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext"; // Use the custom session context
import OnboardingTopNav from "@/components/OnboardingTopNav";
import SideBarNavOnboarding from "@/components/SideBarNavOnboarding";
import { ClipLoader } from 'react-spinners';
import { ThreeDots } from 'react-loader-spinner';


const Onboarding = () => {
	const { data: session, status } = useSession();
	const userData = session?.user;
	const applicationNo = userData?.applicationNo;
	const { token } = useSessionContext(); // Assuming you have a custom session context
	const router = useRouter();
	const { step } = router.query;
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [formData, setFormData] = useState<any>({});
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching data
	const [saving, setSaving] = useState<boolean>(false); // Loading state for saving data

	const steps = [
		"Personal Details",
		"Contact Details",
		"General Information",
		"Next of Kin Details",
		"Reference",
		"Educational Details",
		"Work Experience",
		"Food Safety Questionnaire",
		"Health and Disability",
		"Bank Details",
		"Agreement Consent",
	];

	const stepEndpoints = [
		"personal-details",
		"contact-details",
		"general-info",
		"next-of-kin",
		"reference",
		"educational-details",
		"professional-details",
		"food-safety-questionnaire",
		"health-and-disability",
		"bank-details",
		"agreement-consent",
	];

	useEffect(() => {
		if (step) {
			const stepIndex = parseInt(step as string, 10) - 1;
			if (stepIndex >= 0 && stepIndex < steps.length) {
				setCurrentStep(stepIndex);
			}
		}
	}, [step]);

	useEffect(() => {
		const fetchApplicantData = async () => {
			setLoading(true); // Start loading
			try {
				// Ensure both token and applicationNo are available before making the request
				if (!token || !applicationNo) {
					console.warn("Session or application number is missing.");
					return; // Exit early if either token or applicationNo is missing
				}

				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/applicant/${applicationNo}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch applicant data.");
				}

				const data = await response.json();
				setFormData(data); // Populate form data with the response
			} catch (err: any) {
				console.error("Error fetching applicant data:", err);
				setError(err.message || "An error occurred.");
			} finally {
				setLoading(false); // Stop loading
			}
		};

		// Only fetch data if both token and applicationNo exist
		if (token && applicationNo) {
			fetchApplicantData();
		}
	}, [token, applicationNo]);

	// ValidateStepData function
	const validateStepData = () => {
		const currentStepName = steps[currentStep];
		let isValid = true;
		let errors: { [key: string]: string } = {};
		console.log("formData", formData.personalDetails);
		switch (currentStepName) {
			case "Personal Details":
				if (formData.personalDetails?.dateOfBirth === "") {
					errors.dateOfBirth = "Date of Birth is required";
					isValid = false;
				}
				break;
			// Add other cases for validation of different steps if needed
			default:
				break;
		}

		setValidationErrors(Object.values(errors).join(", "));
		return isValid;
	};

	const handleNext = async () => {
		if (!validateStepData()) {
			return;
		}

		setSaving(true); // Start saving loader
		const stepName = stepEndpoints[currentStep];
		const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${stepName}`;
		const stepData = formData[stepName.replace(/-/g, "")]; // Extract specific data for the current step

		try {
			if (!token) {
				throw new Error("User session is not available. Please log in again.");
			}

			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					...stepData,
					applicationNo,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred.");
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
						applicationNo,
					}),
				}
			);

			const nextStep = Math.min(currentStep + 1, steps.length - 1);
			router.push(`/onboarding?step=${nextStep + 1}`, undefined, {
				shallow: true,
			});
			setCurrentStep(nextStep);
			setError(null);
			setValidationErrors(null);
		} catch (err: any) {
			console.error("Error saving data:", err);
			setError(err.message || "An error occurred.");
		} finally {
			setSaving(false); // Stop saving loader
		}
	};

	const handlePrevious = () => {
		const prevStep = Math.max(currentStep - 1, 0);
		router.push(`/onboarding?step=${prevStep + 1}`, undefined, {
			shallow: true,
		});
		setCurrentStep(prevStep);
	};

	const handleFormChange = (data: any) => {
		const currentStepName = steps[currentStep];
		setFormData((prev: any) => ({
			...prev,
			[`${currentStepName.toLowerCase().replace(/\s+/g, "")}`]: {
				...prev[`${currentStepName.toLowerCase().replace(/\s+/g, "")}`],
				...data,
			},
		}));
	};

	const renderStepContent = () => {
		const currentStepName = steps[currentStep];

		// formData
		switch (currentStepName) {
			case "Personal Details":
				return (
					<PersonalDetails
						onChange={handleFormChange}
						formData={formData.personalDetails}
					/>
				);
			case "Contact Details":
				return (
					<ContactDetails
						onChange={handleFormChange}
						formData={formData.contactDetails}
					/>
				);
			case "General Information":
				return (
					<GeneralInformation
						onChange={handleFormChange}
						formData={formData.generalInformation}
					/>
				);
			case "Professional Details":
				return (
					<ProfessionalDetails
						onChange={handleFormChange}
						formData={formData.professionalDetails}
					/>
				);
			case "Educational Details":
				return (
					<EducationalDetails
						onChange={handleFormChange}
						formData={formData.educationalDetails}
					/>
				);
			case "Reference":
				return (
					<Reference
						onChange={handleFormChange}
						formData={formData.reference}
					/>
				);
			case "Food Safety Questionnaire":
				return (
					<FoodSafetyQuestionnaire
						onChange={handleFormChange}
						formData={formData.foodSafetyQuestionnaire}
					/>
				);
			case "Health and Disability":
				return (
					<HealthAndDisability
						onChange={handleFormChange}
						formData={formData.healthAndDisability}
					/>
				);
			case "Bank Details":
				return (
					<BankDetails
						onChange={handleFormChange}
						formData={formData.bankDetails}
					/>
				);
			case "Agreement Consent":
				return (
					<AgreementConsent
						onChange={handleFormChange}
						formData={formData.agreementConsent}
					/>
				);
			default:
				return null;
		}
	};

	return (
    <>
      <div className="flex flex-col md:flex-row">
        <SideBarNavOnboarding
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="w-full">
          <OnboardingTopNav />
		  
			<div className=" md:w-3/4 p-4">
				<h1 className="mb-4">Welcome {userData?.name}</h1>

				{loading ? (
					 <ThreeDots color="#00BFFF" height={80} width={80} />
				) : (
					renderStepContent()
				)}

				{error && <p className="text-red-500">{error}</p>}
				{validationErrors && (
				<p className="text-red-500">{validationErrors}</p>
				)}

				<div className="py-6 flex items-center justify-between gap-3">
				
				{currentStep > 0 && (
					<button
						type="button"
						onClick={handlePrevious}
						className="w-full h-[44px] flex items-center justify-center gap-2  bg-gray-500 hover:bg-teal-700 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn"
					>
							Previous
					</button>
				)}

					{currentStep < steps.length - 1 ? (
						<button
							type="button"
							onClick={handleNext}
							className="w-full h-[44px] flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-900 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn"
						>
								Save & Next
						</button>
					) : (
						<button
							type="submit"
							className="w-full h-[44px] flex items-center justify-center gap-2 bg-appGreen hover:bg-teal-700 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn"
						>
							Submit
						</button>
					)}
				</div>
			</div>
		  
        </div>
      </div>

	  <style jsx>{`
				.loader-overlay {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.8);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 1000; /* Higher z-index to ensure it's on top */
				}
				.loader {
					border: 4px solid rgba(0, 0, 0, 0.1);
					border-top: 4px solid #3498db;
					border-radius: 50%;
					width: 40px;
					height: 40px;
					animation: spin 1s linear infinite;
				}
				@keyframes spin {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
    </>
  );
};

export default Onboarding;
