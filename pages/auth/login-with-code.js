import { useState } from "react";
import { useRouter } from "next/router";
import { verifyTwoFactor } from "@/hooks/useAuth"; // Adjust the path as necessary

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
		<div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
			<div className="contact-form-area">
				<h5>Enter Two-Factor Code</h5>
				<form onSubmit={handleSubmit}>
					<div
						className="form-inner"
						style={{ marginBottom: "15px" }}>
						<label htmlFor="code">Code:</label>
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
						disabled={loading}
						className="btn btn-dark"
						style={{
							padding: "10px 20px",
							borderRadius: "5px",
							cursor: "pointer",
							width: "100%",
						}}>
						{loading ? "Verifying..." : "Verify Code"}
					</button>
				</form>

				{error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
			</div>
		</div>
	);
};

export default LoginWithCode;
