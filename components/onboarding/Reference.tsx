import React, { useEffect, useState } from "react";

interface ReferenceProps {
	onChange: (data: any) => void;
}

const Reference = ({ onChange }: ReferenceProps) => {
	const [referenceData, setReferenceData] = useState({
		referenceName: "",
		referenceContact: "",
		relationship: "",
	});

	useEffect(() => {
		onChange(referenceData);
	}, [referenceData]);

	return (
		<div>
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default Reference;
