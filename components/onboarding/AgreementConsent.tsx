import React, { useEffect, useState } from "react";

interface AgreementConsentProps {
	onChange: (data: any) => void;
}

const AgreementConsent = ({ onChange }: AgreementConsentProps) => {
	const [agreementData, setAgreementData] = useState({
		termsAgreed: false,
		dateAgreed: new Date(),
	});

	useEffect(() => {
		onChange(agreementData);
	}, [agreementData]);

	return (
		<div>
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default AgreementConsent;
