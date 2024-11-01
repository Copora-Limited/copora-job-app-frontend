import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to the signin page
		router.push("/auth/login");
	}, [router]);

	return null; // Optionally, you can return null to prevent any content from rendering
}
