// components/SideNav.tsx
import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component
import { useTheme } from "@/context/ThemeContext"; // Import useTheme hook for dark mode

interface SideNavProps {
	isApplicant: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isApplicant }) => {
	const { darkMode } = useTheme(); // Get dark mode state
	return (
		// <nav className="bg-gray-800 text-gray-100 w-64 p-4  h-full ">
		<nav
			className={`w-64 h-full p-4 ${
				darkMode ? "bg-gray-900" : "bg-gray-100 shadow-md"
			} text-gray-900 dark:text-gray-100`}>
			<ul>
				{isApplicant ? (
					<>
						<li>
							<Link
								href="/applicant"
								className="block py-2 px-4 hover:bg-gray-700">
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								href="/applicant/profile"
								className="block py-2 px-4 hover:bg-gray-700">
								Profile
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link
								href="/admin"
								className="block py-2 px-4 hover:bg-gray-700">
								Dashboard
							</Link>
						</li>
						<li>
							<Link
								href="/admin/list-admin"
								className="block py-2 px-4 hover:bg-gray-700">
								Admin List
							</Link>
						</li>
						<li>
							<Link
								href="/admin/list-applicants"
								className="block py-2 px-4 hover:bg-gray-700">
								Applicants List
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default SideNav;
