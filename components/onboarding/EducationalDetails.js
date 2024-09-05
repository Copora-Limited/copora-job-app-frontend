import React, { useState, useEffect } from "react";

const EducationDetails = ({ formData = [], onChange }) => {
	// Initialize state with props or with a single default education record
	const [educationRecords, setEducationRecords] = useState(
		Array.isArray(formData) && formData.length > 0
			? formData
			: [
					{
						schoolName: "",
						certificateObtained: "",
						courseOfStudy: "",
						yearAdmitted: "",
						yearGraduated: "",
					},
			  ]
	);

	// Sync educationRecords when formData prop changes
	useEffect(() => {
		if (Array.isArray(formData)) {
			setEducationRecords(
				formData.length > 0
					? formData
					: [
							{
								schoolName: "",
								certificateObtained: "",
								courseOfStudy: "",
								yearAdmitted: "",
								yearGraduated: "",
							},
					  ]
			);
		}
	}, [formData]);

	// Handle input changes
	const handleEducationChange = (index, field, value) => {
		const updatedRecords = educationRecords.map((record, i) =>
			i === index ? { ...record, [field]: value } : record
		);
		setEducationRecords(updatedRecords);
		onChange(updatedRecords); // Notify parent component
	};

	// Add new education record
	const addEducationRecord = () => {
		setEducationRecords([
			...educationRecords,
			{
				schoolName: "",
				certificateObtained: "",
				courseOfStudy: "",
				yearAdmitted: "",
				yearGraduated: "",
			},
		]);
	};

	// Remove education record
	const removeEducationRecord = (index) => {
		setEducationRecords(educationRecords.filter((_, i) => i !== index));
		onChange(educationRecords.filter((_, i) => i !== index)); // Notify parent component
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Educational Details</h2>
			{educationRecords.map((record, index) => (
				<div
					key={index}
					className="border p-4 mb-4 rounded">
					{/* School Name */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							School Name
						</label>
						<input
							type="text"
							value={record.schoolName}
							onChange={(e) =>
								handleEducationChange(index, "schoolName", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="School Name"
						/>
					</div>

					{/* Certificate Obtained */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Certificate Obtained
						</label>
						<input
							type="text"
							value={record.certificateObtained}
							onChange={(e) =>
								handleEducationChange(
									index,
									"certificateObtained",
									e.target.value
								)
							}
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Certificate Obtained"
						/>
					</div>

					{/* Course of Study */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Course of Study
						</label>
						<input
							type="text"
							value={record.courseOfStudy}
							onChange={(e) =>
								handleEducationChange(index, "courseOfStudy", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Course of Study"
						/>
					</div>

					{/* Year Admitted and Year Graduated */}
					<div className="flex flex-col md:flex-row gap-4 mb-4">
						<div className="flex-1">
							<label className="block text-sm font-medium text-gray-700">
								Year Admitted
							</label>
							<input
								type="number"
								value={record.yearAdmitted}
								onChange={(e) =>
									handleEducationChange(index, "yearAdmitted", e.target.value)
								}
								className="w-full p-2 border border-gray-300 rounded mt-1"
								placeholder="Year Admitted"
							/>
						</div>

						<div className="flex-1">
							<label className="block text-sm font-medium text-gray-700">
								Year Graduated
							</label>
							<input
								type="number"
								value={record.yearGraduated}
								onChange={(e) =>
									handleEducationChange(index, "yearGraduated", e.target.value)
								}
								className="w-full p-2 border border-gray-300 rounded mt-1"
								placeholder="Year Graduated"
							/>
						</div>
					</div>

					{/* Remove Button */}
					{educationRecords.length > 1 && (
						<div className="text-right">
							<button
								type="button"
								onClick={() => removeEducationRecord(index)}
								className="text-red-600 hover:text-red-800">
								Remove Education
							</button>
						</div>
					)}
				</div>
			))}

			{/* Add New Education Record Button */}
			<div className="mt-4">
				<button
					type="button"
					onClick={addEducationRecord}
					className="px-4 py-2 bg-blue-600 text-white rounded">
					Add Education Record
				</button>
			</div>
		</div>
	);
};

export default EducationDetails;
