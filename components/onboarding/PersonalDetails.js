import React, { useState, useEffect } from "react";

const PersonalDetails = ({ formData, onChange }) => {
	const [localFormData, setLocalFormData] = useState(formData);

	useEffect(() => {
		// Check if LinkedIn user data is in localStorage
		const linkedinData = localStorage.getItem("linkedinUserData");
		if (linkedinData) {
			const parsedData = JSON.parse(linkedinData);
			setLocalFormData((prevData) => ({
				...prevData,
				title: parsedData.title || "",
				dateOfBirth: parsedData.dateOfBirth || "",
				gender: parsedData.gender || "",
				nationalInsuranceNumber: parsedData.nationalInsuranceNumber || "",
				passportPhoto: prevData.passportPhoto || "",
			}));
			localStorage.removeItem("linkedinUserData"); // Clear the data after use
		}
	}, []);

	useEffect(() => {
		setLocalFormData(formData);
	}, [formData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedFormData = { ...localFormData, [name]: value };
		setLocalFormData(updatedFormData);
		onChange(updatedFormData);
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0] || null;
		const updatedFormData = { ...localFormData, passportPhoto: file };
		setLocalFormData(updatedFormData);
		onChange(updatedFormData);
	};

	return (
		<div>
			<div className="mb-3">
				<button
					className="bg-secondary text-white px-4 py-2 rounded"
					onClick={() => (window.location.href = "/auth/linkedin")}>
					Prefill with LinkedIn
				</button>
			</div>
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
