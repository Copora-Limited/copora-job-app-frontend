// src/components/ApplicantNavBar.tsx
import React from "react";

const ApplicantNavBar: React.FC = () => {
	return (
		<nav className="bg-secondary text-white p-4">
			<ul className="flex space-x-4">
				<li>Applicant Dashboard</li>
				<li>My Applications</li>
				<li>Profile</li>
				<li>Logout</li>
			</ul>
		</nav>
	);
};

export default ApplicantNavBar;
