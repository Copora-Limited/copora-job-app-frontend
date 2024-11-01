// components/TopNav.tsx
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component
import { useTheme } from "@/context/ThemeContext"; // Import useTheme hook for dark mode

const TopNav = () => {
	const { darkMode } = useTheme(); // Get dark mode state
	const { data: session } = useSession();
	const router = useRouter();

	const handleLogout = async () => {
		await signOut({ redirect: false }); // Sign out without redirecting
		router.push("/auth/login"); // Redirect to the sign-in page or any other page
	};
	return (
		<header
			className={`w-full p-4 ${
				darkMode ? "bg-gray-900 shadow-lg" : "bg-white-100 shadow-md"
			} text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-xl font-bold">
					<Link
						href="/"
						className="text-secondary uppercase">
						{process.env.NEXT_PUBLIC_APP_NAME}
					</Link>
				</div>
				<div className="flex items-center space-x-4">
					<ThemeToggle /> {/* Dark mode toggle */}
					{session ? (
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-4 py-2 rounded">
							Logout
						</button>
					) : (
						<Link
							href="/auth"
							className="bg-blue-500 text-white px-4 py-2 rounded">
							Sign In
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default TopNav;
