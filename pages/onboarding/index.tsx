import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PersonalDetails from "@/components/onboarding/PersonalDetails";
import ContactDetails from "@/components/onboarding/ContactDetails";
import ProfessionalDetails from "@/components/onboarding/ProfessionalDetails";
import EducationalDetails from "@/components/onboarding/EducationalDetails";
// import Reference from "@/components/onboarding/Reference";
import FoodSafetyQuestionnaire from "@/components/onboarding/FoodSafetyQuestionnaire";
import HealthAndDisability from "@/components/onboarding/HealthAndDisability";
import BankDetails from "@/components/onboarding/BankDetails";
import AgreementConsent from "@/components/onboarding/AgreementConsent";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext"; // Use the custom session context
import OnboardingTopNav from "@/components/OnboardingTopNav";
import SideBarNavOnboarding from "@/components/SideBarNavOnboarding";



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

	const steps = [
		"Personal Details",
		"Contact Details",
		"Professional Details",
		"Educational Details",
		// "Reference",
		"Food Safety Questionnaire",
		"Health and Disability",
		"Bank Details",
		"Agreement Consent",
	];

	const stepEndpoints = [
		"personal-details",
		"contact-details",
		"professional-details",
		"educational-details",
		// "reference",
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
			}
		};

		// Only fetch data if both token and applicationNo exist
		if (token && applicationNo) {
			fetchApplicantData();
		}
	}, [token, applicationNo]);

	// useEffect to check if formData is properly updated
	useEffect(() => {
		if (formData && Object.keys(formData).length > 0) {
			// console.log("FormData updated:", formData);
		}
	}, [formData]);

	// ValidateStepData function
	const validateStepData = () => {
		const currentStepName = steps[currentStep];
		let isValid = true;
		let errors: { [key: string]: string } = {};
		console.log("formData", formData.personalDetails)
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

	// const handleNext = async () => {
	// 	if (!validateStepData()) {
	// 		return;
	// 	}

	// 	const stepName = stepEndpoints[currentStep];
	// 	const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${stepName}`;
	// 	const stepData = formData[stepName.replace(/-/g, "")]; // Extract specific data for the current step
	// 	console.log("stepData:",stepData);
	// 	try {
	// 		if (!token) {
	// 			throw new Error("User session is not available. Please log in again.");
	// 		}

	// 		const response = await fetch(endpoint, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 			body: JSON.stringify({
	// 				...stepData,
	// 				applicationNo,
	// 			}),
	// 		});

	// 		if (!response.ok) {
	// 			const errorData = await response.json();
	// 			throw new Error(errorData.message || "An error occurred.");
	// 		}

	// 		await fetch(
	// 			`${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/update-onboarding-step`,
	// 			{
	// 				method: "PATCH",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 				body: JSON.stringify({
	// 					onboardingStep: currentStep + 1,
	// 					applicationNo,
	// 				}),
	// 			}
	// 		);

	// 		const nextStep = Math.min(currentStep + 1, steps.length - 1);
	// 		router.push(`/onboarding?step=${nextStep + 1}`, undefined, {
	// 			shallow: true,
	// 		});
	// 		setCurrentStep(nextStep);
	// 		setError(null);
	// 		setValidationErrors(null);
	// 	} catch (err: any) {
	// 		console.error("Error saving data:", err);
	// 		setError(err.message || "An error occurred.");
	// 	}
	// };

	const handleNext = async () => {
		if (!validateStepData()) {
			return;
		}
	
		const stepName = stepEndpoints[currentStep];
		const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/${stepName}`;
		const stepData = formData[stepName.replace(/-/g, "")]; // Extract specific data for the current step
		console.log("stepData:", stepData);
	
		try {
			if (!token) {
				throw new Error("User session is not available. Please log in again.");
			}
	
			let response;
	
			// Check if the step name requires multipart/form-data
			if (["personal-details", "general-info", "educational-details"].includes(stepName)) {
				// Create a new FormData object
				const formDataToSend = new FormData();
	
				// Append all other form data fields except id
				for (const key in stepData) {
					if (key !== "id") { // Exclude id
						if (stepData[key] instanceof File) {
							formDataToSend.append(key, stepData[key]); // Append the file
						} else {
							formDataToSend.append(key, stepData[key]); // Append other data as strings
						}
					}
				}
	
				// Log the FormData contents
				for (const [key, value] of formDataToSend.entries()) {
					console.log(`${key}:`, value);
				}
	
				// Send request with multipart/form-data
				response = await fetch(endpoint, {
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						// Do NOT set Content-Type here; let the browser do it
					},
					body: formDataToSend, // Use FormData as the body
				});
			} else {
				// For other steps, send as application/json
				response = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						// Spread stepData and exclude id
						...Object.fromEntries(Object.entries(stepData).filter(([key]) => key !== "id")),
						applicationNo, // This will be a single string
					}),
				});
			}
	
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
			// case "Reference":
			// 	return (
			// 		<Reference
			// 			onChange={handleFormChange}
			// 			formData={formData.reference}
			// 		/>
			// 	);
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
			// Add other cases similarly
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
					setCurrentStep={setCurrentStep}  />
				<div className="w-full">
					<OnboardingTopNav />
					<div className=" md:w-3/4 p-4">
						<h1 className="mb-4">Welcome {userData?.name}</h1>

						{renderStepContent()}

						{error && <p className="text-red-500">{error}</p>}
						{validationErrors && (
							<p className="text-red-500">{validationErrors}</p>
						)}

						<div className="mt-4 flex justify-between">
							{currentStep > 0 && (
								<button
									type="button"
									onClick={handlePrevious}
									className="mr-2 p-2 bg-gray-500 text-white px-4 py-2 rounded">
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
									className="p-2 bg-green-500 text-white px-4 py-2 rounded">
									Submit
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Onboarding;
