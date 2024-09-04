import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";

const Register = () => {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const response = await registerUser({
				firstName,
				lastName,
				email,
				password,
			});
			if (response.success) {
				// Redirect to login page or homepage upon successful registration
				router.push("/login");
			} else {
				setError("Registration failed. Please try again.");
			}
		} catch (err) {
			setError("An error occurred while registering.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-primary text-white p-4">
			<div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full">
				<h4 className="text-xl font-bold mb-4 text-center uppercase">
					Welcome to{" "}
					<Link
						href="/"
						className="text-secondary">
						{process.env.NEXT_PUBLIC_APP_NAME}
					</Link>
				</h4>
				<div className="mb-4 text-2xl font-bold text-gray-600 text-center">
					Create an Account
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					{error && <p className="text-red-500 text-center mb-4">{error}</p>}

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col">
							<label
								htmlFor="firstName"
								className="mb-2 text-lg">
								First Name:
							</label>
							<input
								type="text"
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
								className="p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="lastName"
								className="mb-2 text-lg">
								Last Name:
							</label>
							<input
								type="text"
								id="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								className="p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="email"
							className="mb-2 text-lg">
							Email:
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="p-2 border border-gray-300 rounded"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex flex-col">
							<label
								htmlFor="password"
								className="mb-2 text-lg">
								Password:
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="confirmPassword"
								className="mb-2 text-lg">
								Confirm Password:
							</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								className="p-2 border border-gray-300 rounded"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`w-full p-2 rounded bg-secondary text-white hover:bg-teal-700 transition ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}>
						{loading ? "Processing..." : "Create an Account"}
					</button>
				</form>

				<div className="mt-4 text-center">
					<p>
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="text-secondary">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
