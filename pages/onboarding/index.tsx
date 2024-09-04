import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PersonalDetails from "@/components/onboarding/PersonalDetails";
import ContactDetails from "@/components/onboarding/ContactDetails";
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

const Onboarding = () => {
	const { data: session, status } = useSession();
	const userData = session?.user;
	const applicationNo = userData?.applicationNo;
	console.log("applicationNo", applicationNo);
	const { token } = useSessionContext(); // Assuming you have a custom session context
	const router = useRouter();
	const { step } = router.query;
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [formData, setFormData] = useState<any>({});
	const [error, setError] = useState<string | null>(null); // State to handle errors
	const [validationErrors, setValidationErrors] = useState<string | null>(null); // State for validation errors

	// Steps list with appropriate formatting
	const steps = [
		"Personal Details",
		"Contact Details",
		"Professional Details",
		"Educational Details",
		"Reference",
		"Food Safety Questionnaire",
		"Health and Disability",
		"Bank Details",
		"Agreement Consent",
	];

	// Corresponding API endpoint slugs
	const stepEndpoints = [
		"personal-details",
		"contact-details",
		"professional-details",
		"educational-details",
		"reference",
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

	const validateStepData = () => {
		const currentStepName = steps[currentStep];
		let isValid = true;
		let errors: { [key: string]: string } = {};

		switch (currentStepName) {
			case "Personal Details":
				// Replace with actual validation logic for Personal Details
				if (!formData.title || !formData.dateOfBirth) {
					errors.title = "Title is required";
					errors.dateOfBirth = "Date of Birth is required";
					isValid = false;
				}
				break;
			// Add validation for other steps here
			default:
				break;
		}

		setValidationErrors(Object.values(errors).join(", "));
		return isValid;
	};

	const handleNext = async () => {
		if (!validateStepData()) {
			return; // Prevent moving to the next step if validation fails
		}

		const stepName = stepEndpoints[currentStep];
		const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${stepName}`;

		try {
			if (!token) {
				throw new Error("User session is not available. Please log in again.");
			}

			// Save the current step data
			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Adjusted to JSON as "multipart/form-data" is not appropriate here
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					...formData,
					applicationNo, // Include applicationNo in the request
				}),
			});

			// Check if there is an error in the response
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred.");
			}

			// Update the onboardingStep
			await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/users/update-onboarding-step`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						onboardingStep: currentStep + 1, // The current step number
					}),
				}
			);

			// Move to the next step
			const nextStep = Math.min(currentStep + 1, steps.length - 1);
			router.push(`/onboarding?step=${nextStep + 1}`, undefined, {
				shallow: true,
			});
			setCurrentStep(nextStep);
			setError(null); // Clear any existing error
			setValidationErrors(null); // Clear any existing validation errors
		} catch (err: any) {
			console.error("Error saving data:", err);
			setError(err.message || "An error occurred."); // Set the error message
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
		setFormData((prev: any) => ({ ...prev, ...data }));
	};

	const renderStepContent = () => {
		switch (steps[currentStep]) {
			case "Personal Details":
				return <PersonalDetails onChange={handleFormChange} />;
			case "Contact Details":
				return <ContactDetails onChange={handleFormChange} />;
			case "Professional Details":
				return <ProfessionalDetails onChange={handleFormChange} />;
			case "Educational Details":
				return <EducationalDetails onChange={handleFormChange} />;
			case "Reference":
				return <Reference onChange={handleFormChange} />;
			case "Food Safety Questionnaire":
				return <FoodSafetyQuestionnaire onChange={handleFormChange} />;
			case "Health and Disability":
				return <HealthAndDisability onChange={handleFormChange} />;
			case "Bank Details":
				return <BankDetails onChange={handleFormChange} />;
			case "Agreement Consent":
				return <AgreementConsent onChange={handleFormChange} />;
			default:
				return null;
		}
	};
	return (
		<>
			<OnboardingTopNav />
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-1/4 bg-gray-100 p-4">
					<ul className="space-y-4">
						{steps.map((step, index) => (
							<li
								key={step}
								className={`cursor-pointer p-2 ${
									currentStep === index
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-700"
								}`}
								onClick={() => {
									router.push(`/onboarding?step=${index + 1}`, undefined, {
										shallow: true,
									});
									setCurrentStep(index);
								}}>
								{step}
							</li>
						))}
					</ul>
				</div>
				<div className="w-full md:w-3/4 p-4">
					<h1 className="mb-4">Welcome {userData?.name}</h1>
					{renderStepContent()}

					{error && <p className="text-red-500">{error}</p>}
					{validationErrors && (
						<p className="text-red-500">{validationErrors}</p>
					)}
					{/* 					
					<div className="flex justify-between mt-4">
						<button
							onClick={handlePrevious}
							disabled={currentStep === 0}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
							Previous
						</button>
						<button
							onClick={handleNext}
							className="bg-blue-500 text-white px-4 py-2 rounded">
							{currentStep === steps.length - 1 ? "Submit" : "Next"}
						</button>
					</div> */}

					<div className="mt-4">
						{currentStep > 0 && (
							<button
								type="button"
								onClick={handlePrevious}
								className="mr-2 p-2 bg-gray-500  text-white px-4 py-2 rounded">
								Previous
							</button>
						)}
						{currentStep < steps.length - 1 ? (
							<button
								type="button"
								onClick={handleNext}
								className="bg-primary text-white px-4 py-2 rounded">
								Next
							</button>
						) : (
							<button
								type="button"
								onClick={handleNext}
								className="p-2 bg-green-500 text-white rounded">
								Submit
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Onboarding;
