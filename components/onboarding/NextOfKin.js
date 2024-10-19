import React, { useState, useEffect } from "react";

const NextOfKinDetailsForm = ({ formData, onChange }) => {
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
			<h2 className="text-xl font-bold mb-4">Next of Kin Details</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* First Name */}
				<div>
					<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
						First Name
					</label>
					<input
						required
						type="text"
						name="firstName"
						value={localFormData?.firstName || ""}
						onChange={handleChange}
						placeholder="Enter your first name"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Last Name */}
				<div>
					<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
						Last Name
					</label>
					<input
						required
						type="text"
						name="lastName"
						value={localFormData?.lastName || ""}
						onChange={handleChange}
						placeholder="Enter your last name"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Relationship */}
				<div>
					<label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
						Select relationship
					</label>
					<select
						required
						name="relationship"
						value={localFormData?.relationship || ""}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1">
						<option value="">Select an option</option>
						<option value="Parent">Parent</option>
						<option value="Family member">Family member</option>
						<option value="Friend">Friend</option>
						<option value="Partner">Partner</option>
						<option value="Others">Others</option>
					</select>
				</div>

				{/* Phone Number */}
				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<input
						required
						type="text"
						name="phoneName"
						value={localFormData?.phoneName || ""}
						onChange={handleChange}
						placeholder="Enter your phone number"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Email */}
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						required
						type="email"
						name="email"
						value={localFormData?.email || ""}
						onChange={handleChange}
						placeholder="Enter your email"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Address */}
				<div>
					<label htmlFor="address" className="block text-sm font-medium text-gray-700">
						Address
					</label>
					<input
						required
						type="text"
						name="address"
						value={localFormData?.address || ""}
						onChange={handleChange}
						placeholder="Enter your address"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>
			</div>
		</div>
	);
};

export default NextOfKinDetailsForm;
