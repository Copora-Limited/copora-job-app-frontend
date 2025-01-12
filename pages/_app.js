// src/pages/_app.js
import "antd/dist/reset.css"; // Import Ant Design CSS
import "./globals.css"; // Your global styles
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/context/SessionContext";
import "react-phone-input-2/lib/style.css"; // Phone input styles
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { ToastContainer } from "react-toastify";
import SessionTimeout from "@/utils/SessionTimeout";
import Head from "next/head"; // Import Next.js Head component

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/assets/favicon.ico" /> {/* Favicon Link */}
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <SessionProvider>
          <SessionTimeout timeout={900000} />
          <ThemeProvider>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar
            />
          </ThemeProvider>
        </SessionProvider>
      </NextAuthProvider>
    </>
  );
}
