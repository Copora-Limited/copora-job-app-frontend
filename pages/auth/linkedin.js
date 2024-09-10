// pages/auth/linkedin.js
import { useRouter } from "next/router";
import { useEffect } from "react";

const LinkedInRedirect = () => {
	const router = useRouter();

	useEffect(() => {
		// Redirect to LinkedIn OAuth endpoint
		// window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_LINKEDIN_STATE}&scope=r_liteprofile%20r_emailaddress`;

		const state = crypto.randomUUID(); // Generate unique state
		sessionStorage.setItem("linkedin_oauth_state", state); // Store in session to validate later

		// Redirect to LinkedIn OAuth endpoint
		window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&state=${state}&scope=r_liteprofile%20r_emailaddress`;
	}, []);

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="text-center p-6 bg-white shadow-md rounded-lg">
					<h1 className="text-2xl font-semibold mb-4 text-gray-700">
						Connected
					</h1>
					<p className="text-gray-500 mb-6">Redirecting to LinkedIn...</p>
					<svg
						className="animate-spin h-12 w-12 text-blue-500 mx-auto"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
							fill="none"
						/>
						<path
							className="opacity-75"
							fill="none"
							stroke="currentColor"
							strokeWidth="4"
							d="M4 12a8 8 0 018-8v0a8 8 0 010 16v0a8 8 0 01-8-8z"
						/>
					</svg>
				</div>
			</div>
		</>
	);
};

export default LinkedInRedirect;
