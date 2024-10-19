import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import UploadBtn from "@/components/Custom/Buttons/UploadBtn";

const PersonalDetails = ({ formData, onChange }) => {
	const [localFormData, setLocalFormData] = useState(formData);
	const [profilePic, setProfilePic] = useState("");
	const fileRef = useRef(null);

	useEffect(() => {
		// Check if LinkedIn user data is in localStorage
		const linkedinData = localStorage.getItem("linkedinUserData");
		if (linkedinData) {
			const parsedData = JSON.parse(linkedinData);
			setLocalFormData((prevData) => ({
				...prevData,
				dateOfBirth: parsedData.dateOfBirth || "",
				gender: parsedData.gender || "",
				nationalInsuranceNumber: parsedData.nationalInsuranceNumber || "",
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

	const handlePhotoFileChange = (e) => {
		if (!e.target.files) return;
		const selectedFile = e.target.files[0];
		setProfilePic(URL.createObjectURL(selectedFile));
		const updatedFormData = { ...localFormData, passportPhoto: selectedFile };
		setLocalFormData(updatedFormData);
		onChange(updatedFormData); // Update the passport photo in the formData
	};

	const handleClick = () => {
		fileRef.current?.click();
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Personal Details</h2>

			<div className="w-full flex items-center gap-3 mt-8">
				<input
					type="file"
					hidden
					ref={fileRef}
					onChange={handlePhotoFileChange}
					accept="image/*"
				/>

				<div className="relative w-[60px] h-[60px] rounded-full">
					<Image
						src={profilePic || "/assets/img/user-avatar.svg"} // Use next/image for profile picture
						alt="user"
						layout="fill" // Fill the parent div
						className="rounded-full"
						objectFit="cover" // Ensures the image covers the area
					/>

					<Image
						src="/assets/img/verified_tick.svg" // Use next/image for verified tick
						alt="verified tick"
						width={19}
						height={19}
						className="absolute bottom-0 right-0"
					/>
				</div>

				<UploadBtn text="Upload profile" onClick={handleClick} />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
			</div>
		</div>
	);
};

export default PersonalDetails;
