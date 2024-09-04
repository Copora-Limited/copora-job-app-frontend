import React, { useEffect, useState } from "react";

interface ProfessionalDetailsProps {
	onChange: (data: any) => void;
}

const ProfessionalDetails = ({ onChange }: ProfessionalDetailsProps) => {
	const [professionalData, setProfessionalData] = useState({
		currentEmployer: "",
		jobTitle: "",
		yearsOfExperience: "",
		industry: "",
		skills: "",
	});

	useEffect(() => {
		onChange(professionalData);
	}, [professionalData]);
	return (
		<div>
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default ProfessionalDetails;
