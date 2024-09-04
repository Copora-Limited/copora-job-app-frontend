import React, { useEffect, useState } from "react";

interface HealthAndDisabilityProps {
	onChange: (data: any) => void;
}

const HealthAndDisability = ({ onChange }: HealthAndDisabilityProps) => {
	const [healthData, setHealthData] = useState({
		hasDisabilities: false,
		disabilityDetails: "",
		hasChronicIllness: false,
		illnessDetails: "",
	});

	useEffect(() => {
		onChange(healthData);
	}, [healthData]);

	return (
		<div>
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default HealthAndDisability;
