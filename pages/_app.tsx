// src/pages/_app.tsx
import "./globals.css";
import { AppProps } from "next/app";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/context/SessionContext"; // Import your custom SessionProvider
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<SessionProvider>
				{" "}
				{/* Wrap in your custom SessionProvider */}
				<ThemeProvider>
					{/* <Layout> */}
					<Component {...pageProps} />
					{/* </Layout> */}
				</ThemeProvider>
			</SessionProvider>
		</NextAuthProvider>
	);
}
