import React, { useEffect, useState } from "react";

interface FoodSafetyQuestionnaireProps {
	onChange: (data: any) => void;
}

const FoodSafetyQuestionnaire = ({
	onChange,
}: FoodSafetyQuestionnaireProps) => {
	const [foodSafetyData, setFoodSafetyData] = useState({
		hasFoodSafetyCertification: false,
		certificationDetails: "",
		lastTrainingDate: "",
	});

	useEffect(() => {
		onChange(foodSafetyData);
	}, [foodSafetyData]);

	return (
		<div>
			FoodSafetyQuestionnaire
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default FoodSafetyQuestionnaire;
