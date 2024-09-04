import React, { useEffect, useState } from "react";

interface ContactDetailsProps {
	onChange: (data: any) => void;
}

const ContactDetails = ({ onChange }: ContactDetailsProps) => {
	const [contactData, setContactData] = useState({
		address: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phoneNumber: "",
	});

	useEffect(() => {
		onChange(contactData);
	}, [contactData]);

	return (
		<div>
			ContactDetails
			{/* Your form fields here */}
			{/* Update the state with onChange handlers */}
		</div>
	);
};

export default ContactDetails;
