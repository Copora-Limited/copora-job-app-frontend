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

	return <div>Redirecting...</div>;
};

export default Redirect;
