import React, { useState, useEffect } from "react";

const PersonalDetails = ({ formData, onChange }) => {
	// Initialize state with props
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

	// Handle file input changes
	const handleFileChange = (e) => {
		const file = e.target.files?.[0] || null;
		const updatedFormData = { ...localFormData, passportPhoto: file };
		setLocalFormData(updatedFormData);
		onChange(updatedFormData); // Notify parent component
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Personal Details</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Title */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<select
						required
						name="title"
						value={localFormData?.title || ""}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1">
						<option value="">Select Title</option>
						<option value="Mr">Mr</option>
						<option value="Mrs">Mrs</option>
						<option value="Miss">Miss</option>
						<option value="Ms">Ms</option>
						<option value="Dr">Dr</option>
					</select>
				</div>

				{/* Date of Birth */}
				<div>
					<label
						htmlFor="dateOfBirth"
						className="block text-sm font-medium text-gray-700">
						Date of Birth
					</label>
					<input
						required
						type="date"
						name="dateOfBirth"
						value={
							localFormData?.dateOfBirth
								? new Date(localFormData.dateOfBirth).toISOString().slice(0, 10)
								: ""
						}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Gender */}
				<div>
					<label
						htmlFor="gender"
						className="block text-sm font-medium text-gray-700">
						Gender
					</label>
					<select
						required
						name="gender"
						value={localFormData?.gender || ""}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1">
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>

				{/* National Insurance Number */}
				<div>
					<label
						htmlFor="nationalInsuranceNumber"
						className="block text-sm font-medium text-gray-700">
						National Insurance Number
					</label>
					<input
						required
						type="text"
						name="nationalInsuranceNumber"
						value={localFormData?.nationalInsuranceNumber || ""}
						onChange={handleChange}
						placeholder="National Insurance Number"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				{/* Passport Photo */}
				<div className="col-span-2">
					<label
						htmlFor="passportPhoto"
						className="block text-sm font-medium text-gray-700">
						Passport Photo
					</label>
					<input
						type="file"
						name="passportPhoto"
						onChange={handleFileChange}
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
