import React, { useState } from "react";

const AgreementConsentForm = ({ formData = {}, onChange }) => {
	const initialFormData = formData || {};

	const [formState, setFormState] = useState({
		employmentStatusDeclaration:
			initialFormData.employmentStatusDeclaration || "",
		declarationAgreement: initialFormData.declarationAgreement || "",
		userConsent: initialFormData.userConsent || "",
	});

	const handleChange = (field, value) => {
		const updatedFormState = { ...formState, [field]: value };
		setFormState(updatedFormState);
		onChange(updatedFormState); // Notify parent component
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Agreement Consent Form</h2>

			{/* Employment Status Declaration */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Employment Status Declaration
				</label>
				<textarea
					value={formState.employmentStatusDeclaration}
					onChange={(e) =>
						handleChange("employmentStatusDeclaration", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* Declaration Agreement */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Declaration Agreement
				</label>
				<textarea
					value={formState.declarationAgreement}
					onChange={(e) => handleChange("declarationAgreement", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* User Consent */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					User Consent
				</label>
				<textarea
					value={formState.userConsent}
					onChange={(e) => handleChange("userConsent", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>
		</div>
	);
};

export default AgreementConsentForm;
