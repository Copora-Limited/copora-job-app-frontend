import React, { useState, useEffect } from "react";

const ContactDetails = ({ formData, onChange }) => {
	// Initialize local state with formData prop
	const [localFormData, setLocalFormData] = useState(formData);

	// Sync localFormData when formData prop changes
	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedFormData = { ...localFormData, [name]: value };
		setLocalFormData(updatedFormData);
		onChange(updatedFormData); // Notify parent component
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Contact Details</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Phone */}
				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700">
						Phone
					</label>
					<input
						required
						type="text"
						name="phone"
						value={localFormData?.phone || ""}
						onChange={handleChange}
						placeholder="Phone Number"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Street */}
				<div>
					<label
						htmlFor="address_line_1"
						className="block text-sm font-medium text-gray-700">
						address 1
					</label>
					<input
						required
						type="text"
						name="address_line_1"
						value={localFormData?.address_line_1 || ""}
						onChange={handleChange}
						placeholder="Address"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>
				<div>
					<label
						htmlFor="address_line_2"
						className="block text-sm font-medium text-gray-700">
						address 2
					</label>
					<input
						required
						type="text"
						name="address_line_2"
						value={localFormData?.address_line_2 || ""}
						onChange={handleChange}
						placeholder="Address 2"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>


				
				{/* Country */}
				<div>
					<label
						htmlFor="country"
						className="block text-sm font-medium text-gray-700">
						Country
					</label>
					<input
						required
						type="text"
						name="country"
						value={localFormData?.country || ""}
						onChange={handleChange}
						placeholder="Country"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Town */}
				<div>
					<label
						htmlFor="town"
						className="block text-sm font-medium text-gray-700">
						Town
					</label>
					<input
						required
						type="text"
						name="town"
						value={localFormData?.town || ""}
						onChange={handleChange}
						placeholder="Town/City"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>


				{/* Postcode */}
				<div>
					<label
						htmlFor="postcode"
						className="block text-sm font-medium text-gray-700">
						Postcode
					</label>
					<input
						required
						type="text"
						name="postcode"
						value={localFormData?.postcode || ""}
						onChange={handleChange}
						placeholder="Postcode"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* LinkedIn */}
				{/* <div>
					<label
						htmlFor="linkedin"
						className="block text-sm font-medium text-gray-700">
						LinkedIn
					</label>
					<input
						type="text"
						name="linkedin"
						value={localFormData?.linkedin || ""}
						onChange={handleChange}
						placeholder="LinkedIn Profile URL"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div> */}

				{/* Twitter */}
				{/* <div>
					<label
						htmlFor="twitter"
						className="block text-sm font-medium text-gray-700">
						Twitter
					</label>
					<input
						type="text"
						name="twitter"
						value={localFormData?.twitter || ""}
						onChange={handleChange}
						placeholder="Twitter Profile URL"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div> */}

				
			</div>
		</div>
	);
};

export default ContactDetails;
