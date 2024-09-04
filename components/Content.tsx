// components/Content.tsx
import React from "react";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme hook for dark mode
import { useSession } from "next-auth/react";

const Content: React.FC = () => {
	const { darkMode } = useTheme(); // Get dark mode state
	const { data: session } = useSession();
	const userData = session?.user;
	const fullName = userData?.name;
	return (
		<main className={`flex-1 p-2 `}>
			<h1 className="text-2xl font-semibold mb-4">Welcome {fullName} !</h1>
			<p>
				{/* This is a sample content area. You can add more components and content
				here. */}
			</p>
			{/* Add more content and components as needed */}
		</main>
	);
};

export default Content;
