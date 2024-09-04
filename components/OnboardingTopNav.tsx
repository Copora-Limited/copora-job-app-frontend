import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function OnboardingTopNav() {
	const { data: session } = useSession();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/auth/login" });
	};

	return (
		<div className="bg-gray-800 text-white p-4 flex justify-between items-center">
			{/* App Name */}
			<div className="text-xl font-bold">
				<Link
					href="/"
					className="text-secondary">
					{process.env.NEXT_PUBLIC_APP_NAME}
				</Link>
			</div>

			{/* Logout Button */}
			{session && (
				<button
					onClick={handleSignOut}
					className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400">
					Logout
				</button>
			)}
		</div>
	);
}
