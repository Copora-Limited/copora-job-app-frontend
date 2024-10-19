import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
	const router = useRouter();
	const [email, setEmail] = useState("daniel.walker@copora.com");
	const [password, setPassword] = useState("mPMB6h");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [redirectTimeout, setRedirectTimeout] = useState(5);
	const [showRedirectButton, setShowRedirectButton] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false); // Example state for dark mode
	
	useEffect(() => {
		let timer;

		if (redirectTimeout > 0 && showRedirectButton) {
			timer = setInterval(() => {
				setRedirectTimeout((prev) => prev - 1);
			}, 1000);
		}

		if (redirectTimeout === 0) {
			router.push(`/verify-two-factor-code?email=${encodeURIComponent(email)}`);
		}

		return () => timer && clearInterval(timer);
	}, [redirectTimeout, showRedirectButton, router, email]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await authenticateUser(email, password);

			if (result?.ok) {
				handleSuccess(result);
			} else {
				handleError(result);
			}
		} catch (error) {
			setError(error.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	const authenticateUser = async (email, password) => {
		return await signIn("credentials", {
			redirect: false,
			email,
			password,
		});
	};

	const handleSuccess = (result) => {
		if (result.status === 200) {
			redirectUser(result?.data?.role);
		} else if (result.status === 403) {
			router.push(`/auth/forget-password?email=${email}`);
		} else {
			setError(
				"Two Factor Authentication is enabled. Please verify your code."
			);
			setShowRedirectButton(true);
		}
	};

	const handleError = (result) => {
		setError(result.error || "Login failed");
	};

	const redirectUser = (role) => {
		router.push("/redirect");
	};

	const handleRedirectNow = () => {
		router.push(`/login-with-code?email=${encodeURIComponent(email)}`);
	};

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
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
				<div className="mb-4 text-2xl font-bold text-gray-600 text-center">
					Login
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-4">
					{error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
					<div className="relative mb-6">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`w-full px-3 py-2 border rounded-full text-lg focus:outline-none focus:ring-2 ${
								isDarkMode
									? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-600"
									: "bg-white border-gray-300 text-gray-900 focus:ring-cyan-500"
							}`}
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="absolute inset-y-0 right-0 flex items-center pr-3">
							<FontAwesomeIcon
								icon={showPassword ? faEyeSlash : faEye}
								className={`h-5 w-5 ${
									isDarkMode ? "text-gray-300" : "text-gray-500"
								}`}
							/>
						</button>
					</div>
					<button
						type="submit"
						className={`w-full p-2 rounded bg-secondary text-white hover:bg-teal-700 transition ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
					<div className="text-secondary">
						<Link
							href="/auth/forgot-password"
							className="text-secondary">
							Forgot your password?{" "}
						</Link>
					</div>
					<div className="mt-4 text-gray-600 text-center">
						By continuing you agree to {process.env.NEXT_PUBLIC_APP_NAME}'s{" "}
						<Link
							href="/"
							className="text-secondary">
							Terms of use
						</Link>
					</div>
					<div className="my-4 border-t border-gray-300 pt-4">
						{/* <Link
							href="/auth/passwordless-login"
							className="block text-center text-secondary bg-primary text-white p-2 rounded hover:bg-teal-700 transition">
							Login with code
						</Link> */}
					</div>
				</form>

				{showRedirectButton && (
					<div className="text-center mt-4">
						<p>Redirecting in {redirectTimeout} seconds...</p>
						<button
							className="mt-4 p-2 rounded bg-secondary text-white hover:bg-teal-700 transition"
							onClick={handleRedirectNow}>
							Redirect Now
						</button>
					</div>
				)}
				<div className="mt-4 text-center">
					<p>
						Don't have an account?{" "}
						<Link
							href="/signup"
							className="text-secondary">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
