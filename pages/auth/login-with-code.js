import { useState } from "react";
import { useRouter } from "next/router";
import { verifyTwoFactor } from "@/hooks/useAuth"; // Adjust the path as necessary
import Link from "next/link";

const LoginWithCode = () => {
	const router = useRouter();
	const { email } = router.query;
	const [twoFactorCode, setTwoFactorCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await verifyTwoFactor(email, twoFactorCode);
			localStorage.setItem("token", response.token); // Assuming the response includes a token
			if (response.user.role === "applicant") {
				router.push("/applicant"); // Redirect to homepage or dashboard
			} else {
				router.push("/admin"); // Redirect to homepage or dashboard
			}
		} catch (error) {
			setError(error.message);
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
				<div className="mb-4 text-2xl font-bold text-gray-600 text-center">
					Login with code
				</div>
				{/* <h5>Enter Two-Factor Code</h5> */}
				<form onSubmit={handleSubmit}>
					<div
						className="form-inner"
						style={{ marginBottom: "15px" }}>
						<label htmlFor="code">Enter Code received in your email:</label>
						<input
							type="text"
							id="code"
							value={twoFactorCode}
							onChange={(e) => setTwoFactorCode(e.target.value)}
							required
							className="form-control border"
							style={{ width: "100%", padding: "8px" }}
						/>
					</div>

					<button
						type="submit"
						className={`w-full p-2 rounded bg-secondary text-white hover:bg-teal-700 transition ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}>
						{loading ? "Verifying..." : "Verify Code"}
					</button>
				</form>

				{error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
			</div>
		</div>
	);
};

export default LoginWithCode;
