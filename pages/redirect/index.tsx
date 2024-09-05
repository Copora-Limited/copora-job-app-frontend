import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Redirect = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") {
			// Optionally show a loading state while fetching session
			return;
		}

		if (status === "authenticated" && session?.user) {
			const { role, email, resetPassword, onboardingStep } = session.user;
			console.log("User", session?.user);
			if (role === "applicant") {
				if (resetPassword) {
					// Check onboarding step and redirect accordingly
					if (onboardingStep < 2) {
						router.push(`/onboarding?step=${onboardingStep}`);
					} else {
						// Redirect applicants with resetPassword set to true and onboardingStep >= 2 to /applicant
						router.push("/applicant");
					}
					return;
				}

				// Redirect to notify-me if resetPassword is false
				router.push(`/auth/notify-me?email=${email}&new=true`);
			} else if (role === "admin") {
				// Redirect admins to /admin
				router.push("/admin");
			} else {
				// Default redirection
				router.push("/");
			}
		} else {
			// Redirect to login if not authenticated
			router.push("/auth/login");
		}
	}, [status, session, router]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center p-6 bg-white shadow-md rounded-lg">
				<h1 className="text-2xl font-semibold mb-4 text-gray-700">
					Redirecting...
				</h1>
				<p className="text-gray-500 mb-6">
					You are being redirected.
					{/* If the redirection doesn't happen automatically,  */}
					{/* <a href="/auth/login" className="text-blue-500 hover:underline">click here</a>. */}
				</p>
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
	);
};

export default Redirect;
