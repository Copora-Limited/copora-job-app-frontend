"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use NextAuth for authentication
import NavBar from "@/components/NavBar";
const SignIn = () => {
	const [email, setEmail] = useState("john@example.com");
	const [password, setPassword] = useState("password123");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result?.error) {
				setError(result.error);
				console.log(result.error);
			} else {
				window.location.href = "/admin"; // Redirect to the home page or another page after successful sign-in
			}
		} catch (err) {
			setError("An error occurred during sign-in.");
		}
	};

	return (
		<div>
			<NavBar />
			<h1>Sign In</h1>
			<form
				onSubmit={handleSubmit}
				method="post">
				<div>
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Sign In</button>
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default SignIn;
