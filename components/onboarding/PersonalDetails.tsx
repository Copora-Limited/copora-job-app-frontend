import { useState } from "react";

interface PersonalDetailsProps {
	onChange: (data: any) => void;
}

const PersonalDetails = ({ onChange }: PersonalDetailsProps) => {
	const [formData, setFormData] = useState({
		title: "",
		dateOfBirth: "",
		gender: "",
		nationalInsuranceNumber: "",
		profilePicture: null as File | null,
		address: "",
		city: "",
		country: "",
		phoneNumber: "",
		state: "",
		zipCode: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		onChange({ ...formData, [name]: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({ ...prev, profilePicture: file }));
		onChange({ ...formData, profilePicture: file });
	};

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Personal Details</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<select
						required
						name="title"
						value={formData.title}
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
						value={formData.dateOfBirth}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="gender"
						className="block text-sm font-medium text-gray-700">
						Gender
					</label>
					<select
						required
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded mt-1">
						<option value="">Select Gender</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</select>
				</div>

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
						value={formData.nationalInsuranceNumber}
						onChange={handleChange}
						placeholder="National Insurance Number"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="address"
						className="block text-sm font-medium text-gray-700">
						Address
					</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						placeholder="Address"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="city"
						className="block text-sm font-medium text-gray-700">
						City
					</label>
					<input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						placeholder="City"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="country"
						className="block text-sm font-medium text-gray-700">
						Country
					</label>
					<input
						type="text"
						name="country"
						value={formData.country}
						onChange={handleChange}
						placeholder="Country"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="phoneNumber"
						className="block text-sm font-medium text-gray-700">
						Phone Number
					</label>
					<input
						type="text"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
						placeholder="Phone Number"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="state"
						className="block text-sm font-medium text-gray-700">
						State
					</label>
					<input
						type="text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						placeholder="State"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div>
					<label
						htmlFor="zipCode"
						className="block text-sm font-medium text-gray-700">
						Zip Code
					</label>
					<input
						type="text"
						name="zipCode"
						value={formData.zipCode}
						onChange={handleChange}
						placeholder="Zip Code"
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>

				<div className="col-span-2">
					<label
						htmlFor="profilePicture"
						className="block text-sm font-medium text-gray-700">
						Passport Photo
					</label>
					<input
						type="file"
						name="profilePicture"
						onChange={handleFileChange}
						className="w-full p-2 border border-gray-300 rounded mt-1"
					/>
				</div>
			</div>
		</div>
	);
};

export default PersonalDetails;
