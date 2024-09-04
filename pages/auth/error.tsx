// pages/auth/error.tsx
import React from "react";
import { useRouter } from "next/router";

const ErrorPage = () => {
	const router = useRouter();
	const { error } = router.query;

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
				<h1 className="text-2xl font-bold mb-6 text-center">Error</h1>
				<p className="text-red-500 text-center">
					{error === "OAuthAccountNotLinked"
						? "This account is not linked with any existing account."
						: "An error occurred. Please try again later."}
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
