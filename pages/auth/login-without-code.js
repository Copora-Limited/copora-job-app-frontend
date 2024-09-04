import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verifyTwoFactor } from "@/hooks/useAuth"; // Adjust the path as necessary

const LoginWithOutCode = () => {
	const router = useRouter();
	const { email, code } = router.query;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const verifyCode = async () => {
			// if (typeof email === "string" && typeof code === "number") {
			if (typeof email === "string" && typeof code === "string") {
				try {
					const response = await verifyTwoFactor(email, code);
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
			} else {
				setError("Invalid parameters or link has expired");
				setLoading(false);
			}
		};

		verifyCode();
	}, [email, code, router]);

	return (
		<div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
			<div className="contact-form-area">
				<h5>Processing...</h5>
				{loading && <p>Verifying code, please wait...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>
		</div>
	);
};

export default LoginWithOutCode;
