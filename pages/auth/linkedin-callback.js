// pages/auth/linkedin-callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const LinkedInCallback = () => {
	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			const { code } = router.query;

			if (code) {
				try {
					const response = await fetch(
						`/api/auth/linkedin-callback?code=${code}`
					);
					const data = await response.json();
					if (response.ok) {
						// Handle pre-filled form data here
						// For example, save the data to local storage or send it to a form
						localStorage.setItem("linkedinUserData", JSON.stringify(data));
						router.push("/onboarding"); // Redirect to your form page
					} else {
						console.error("Failed to fetch LinkedIn user data:", data.message);
					}
				} catch (error) {
					console.error("Error:", error);
				}
			}
		};

		fetchUserData();
	}, [router]);

	return <p>Fetching LinkedIn user data...</p>;
};

export default LinkedInCallback;
