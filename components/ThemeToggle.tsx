// components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
	const { darkMode, setDarkMode } = useTheme();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true); // This will be true only on the client side
	}, []);

	if (!isClient) {
		// Render nothing or a loading spinner if you prefer
		return null;
	}

	return (
		<button
			onClick={() => setDarkMode(!darkMode)}
			className="p-2 bg-gray-200 dark:bg-gray-600 rounded">
			{darkMode ? "Light Mode" : "Dark Mode"}
		</button>
	);
};

export default ThemeToggle;
