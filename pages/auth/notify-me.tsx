import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sendResetPasswordEmail } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";

const ForgotPassword = () => {
	const router = useRouter();
	const { email: emailFromRoute } = router.query;

	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (emailFromRoute) {
			setEmail(emailFromRoute as string);
		}
	}, [emailFromRoute]);

	const handleProceed = async () => {
		setLoading(true);

		try {
			const response = await sendResetPasswordEmail(email);
			if (response.statusCode === 200) {
				setMessage(
					"A password reset link has been sent to your email. Please check your inbox."
				);
				setError(null);
			} else {
				setError("Failed to send password reset email. Please try again.");
			}
		} catch (err) {
			setError("An error occurred while sending the password reset email.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-primary text-white p-4">
			<div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full">
				<h4 className="text-xl font-bold mb-4 text-center uppercase">
					<Link
						href="/"
						className="text-secondary">
						{process.env.NEXT_PUBLIC_APP_NAME}
					</Link>
				</h4>

				{!message ? (
					<>
						<div className="mb-4 text-2xl font-bold text-gray-600 text-center">
							Welcome!
						</div>
						<div className="text-center">
							<p className="mb-4">
								As a new user, we need to reset your password to complete your
								account setup. Please click the button below to proceed.
							</p>
							<button
								onClick={handleProceed}
								disabled={loading}
								className={`w-full p-2 rounded bg-secondary text-white hover:bg-teal-700 transition ${
									loading ? "opacity-50 cursor-not-allowed" : ""
								}`}>
								{loading ? "Processing..." : "Proceed"}
							</button>
							{error && (
								<p className="text-red-500 text-center mt-4">{error}</p>
							)}
						</div>
					</>
				) : (
					<>
						<div className="mb-4 text-2xl text-green-500 font-bold text-gray-600 text-center">
							Success!
						</div>
						<p className="text-green-500 text-center mt-4">{message}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
