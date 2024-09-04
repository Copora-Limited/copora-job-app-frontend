// components/NavBar.tsx
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component
import { useTheme } from "@/context/ThemeContext"; // Import useTheme hook for dark mode

const NavBar = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { darkMode } = useTheme(); // Get dark mode state

	const handleLogout = async () => {
		await signOut({ redirect: false }); // Sign out without redirecting
		router.push("/auth/login"); // Redirect to the sign-in page or any other page
	};

	return (
		<nav
			className={`p-4 ${
				darkMode ? "bg-gray-900" : "bg-gray-100"
			} text-gray-900 dark:text-gray-100`}>
			<div className="container mx-auto flex items-center justify-between">
				<div className="text-xl font-bold">
					<Link href="/">My App</Link>
				</div>
				<div className="flex space-x-4">
					<Link href="/admin/">Dashboard</Link>
					<Link href="/admin/list-admin">Admin List</Link>
					<Link href="/admin/list-applicants">Applicants List</Link>
					<Link href="/profile">Profile</Link>
					<Link href="/settings">Settings</Link>
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
		</nav>
	);
};

export default NavBar;
