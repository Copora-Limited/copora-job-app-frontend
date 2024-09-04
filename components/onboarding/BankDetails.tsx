import React, { useEffect, useState } from "react";

interface BankDetailsProps {
	onChange: (data: any) => void;
}
const BankDetails = ({ onChange }: BankDetailsProps) => {
	const [bankData, setBankData] = useState({
		bankName: "",
		accountNumber: "",
		sortCode: "",
		accountHolderName: "",
	});

	useEffect(() => {
		onChange(bankData);
	}, [bankData]);

	return (
		<div>
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default BankDetails;
