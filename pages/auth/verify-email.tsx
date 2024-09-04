import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyEmail } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";
const VerifyEmail = () => {
	const router = useRouter();
	const { token } = router.query; // Retrieve the token from the query parameters

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [countdown, setCountdown] = useState(10); // Countdown in seconds
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const verifyToken = async () => {
			if (typeof token === "string") {
				try {
					const response = await verifyEmail(token);
					if (response.message === "Email is already verified") {
						setMessage(response.message);
						setLoading(false);
					} else {
						setMessage(
							"Your email has been verified successfully. Redirecting to login..."
						);
						startCountdown();
					}
				} catch (err) {
					setError(
						"Failed to verify email. The token might be invalid or expired."
					);
					setLoading(false);
				}
			} else {
				setError("Invalid token.");
				setLoading(false);
			}
		};

		verifyToken();

		return () => {
			if (intervalId) clearInterval(intervalId); // Clean up interval on unmount
		};
	}, [token]);

	const startCountdown = () => {
		const id = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(id);
					router.push("/auth/login"); // Redirect to login page
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		setIntervalId(id);
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
				<div className="text-center">
					{loading ? (
						<p className="text-lg font-semibold">Loading...</p>
					) : (
						<>
							{message && (
								<>
									<p className="text-green-500 text-lg font-semibold mb-4">
										{message}
									</p>
									{message.includes("successfully") && (
										<p className="text-lg font-semibold">
											Redirecting to login in {countdown} seconds...
										</p>
									)}
								</>
							)}
							{error && (
								<>
									<p className="text-red-500 text-lg font-semibold mb-4">
										{error}
									</p>
									<div className="space-x-2">
										<button
											onClick={() => router.push("/")}
											className="px-4 py-2 rounded bg-secondary text-white hover:bg-teal-700 transition">
											Go to Home
										</button>
										<button
											onClick={() => router.push("/auth/login")}
											className="px-4 py-2 rounded bg-secondary text-white hover:bg-teal-700 transition">
											Go to Login
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;
