import React, { useEffect, useState } from "react";

interface EducationalDetailsProps {
	onChange: (data: any) => void;
}

const EducationalDetails = ({ onChange }: EducationalDetailsProps) => {
	const [educationData, setEducationData] = useState({
		highestQualification: "",
		institution: "",
		graduationYear: "",
		major: "",
	});

	useEffect(() => {
		onChange(educationData);
	}, [educationData]);

	return (
		<div>
			EducationalDetails
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default EducationalDetails;
