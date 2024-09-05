import React, { useState } from "react";

const FoodSafetyQuestionnaire = ({ formData = {}, onChange }) => {
	// Ensure formData is not null or undefined
	const initialFormData = formData || {};

	const [formState, setFormState] = useState({
		cleaningRawMeatUtensilsRequired:
			initialFormData.cleaningRawMeatUtensilsRequired || false,
		foodSafetyAct1990Description:
			initialFormData.foodSafetyAct1990Description || "",
		cleaningRequirement: initialFormData.cleaningRequirement || "",
		contaminatedFoodCharacteristics:
			initialFormData.contaminatedFoodCharacteristics || "",
		bacteriaFactTrue: initialFormData.bacteriaFactTrue || "",
		highRiskFoodStoragePosition:
			initialFormData.highRiskFoodStoragePosition || "",
		temperatureDangerZone: initialFormData.temperatureDangerZone || "",
		handWashingScenarios: initialFormData.handWashingScenarios || "",
		allergenDefinition: initialFormData.allergenDefinition || "",
		highRiskFoodsExamples: initialFormData.highRiskFoodsExamples || "",
		foodSafetyActOffense: initialFormData.foodSafetyActOffense || "",
		licensingRegulationAgreement:
			initialFormData.licensingRegulationAgreement || false,
	});

	const handleChange = (field, value) => {
		const updatedFormState = { ...formState, [field]: value };
		setFormState(updatedFormState);
		onChange(updatedFormState); // Notify parent component
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Food Safety Questionnaire</h2>

			{/* cleaningRawMeatUtensilsRequired */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Do you think cleaning raw meat utensils is required?
				</label>
				<input
					type="checkbox"
					checked={formState.cleaningRawMeatUtensilsRequired}
					onChange={(e) =>
						handleChange("cleaningRawMeatUtensilsRequired", e.target.checked)
					}
					className="mt-2"
				/>
			</div>

			{/* foodSafetyAct1990Description */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Can you describe the Food Safety Act 1990?
				</label>
				<textarea
					value={formState.foodSafetyAct1990Description}
					onChange={(e) =>
						handleChange("foodSafetyAct1990Description", e.target.checked)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* cleaningRequirement */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					What are the requirements for cleaning food contact surfaces?
				</label>
				<textarea
					value={formState.cleaningRequirement}
					onChange={(e) => handleChange("cleaningRequirement", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* contaminatedFoodCharacteristics */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					What are the characteristics of contaminated food?
				</label>
				<textarea
					value={formState.contaminatedFoodCharacteristics}
					onChange={(e) =>
						handleChange("contaminatedFoodCharacteristics", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* bacteriaFactTrue */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					State one true fact about bacteria in food.
				</label>
				<textarea
					value={formState.bacteriaFactTrue}
					onChange={(e) => handleChange("bacteriaFactTrue", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* highRiskFoodStoragePosition */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Where should high-risk foods be stored?
				</label>
				<textarea
					value={formState.highRiskFoodStoragePosition}
					onChange={(e) =>
						handleChange("highRiskFoodStoragePosition", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* temperatureDangerZone */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					What is the temperature danger zone for food?
				</label>
				<textarea
					value={formState.temperatureDangerZone}
					onChange={(e) =>
						handleChange("temperatureDangerZone", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* handWashingScenarios */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					In what scenarios should you wash your hands?
				</label>
				<textarea
					value={formState.handWashingScenarios}
					onChange={(e) => handleChange("handWashingScenarios", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* allergenDefinition */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					What is the definition of an allergen?
				</label>
				<textarea
					value={formState.allergenDefinition}
					onChange={(e) => handleChange("allergenDefinition", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* highRiskFoodsExamples */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Give examples of high-risk foods.
				</label>
				<textarea
					value={formState.highRiskFoodsExamples}
					onChange={(e) =>
						handleChange("highRiskFoodsExamples", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* foodSafetyActOffense */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					What is an offense under the Food Safety Act?
				</label>
				<textarea
					value={formState.foodSafetyActOffense}
					onChange={(e) => handleChange("foodSafetyActOffense", e.target.value)}
					className="w-full p-2 border border-gray-300 rounded mt-1"
				/>
			</div>

			{/* licensingRegulationAgreement */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Do you agree with the licensing and regulation terms?
				</label>
				<input
					type="checkbox"
					checked={formState.licensingRegulationAgreement}
					onChange={(e) =>
						handleChange("licensingRegulationAgreement", e.target.checked)
					}
					className="mt-2"
				/>
			</div>
		</div>
	);
};

export default FoodSafetyQuestionnaire;
