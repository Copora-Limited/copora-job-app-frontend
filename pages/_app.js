// src/pages/_app.js
import "antd/dist/reset.css"; // Import Ant Design CSS
import "./globals.css"; // Your global styles
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/context/SessionContext";
import "react-phone-input-2/lib/style.css"; // Phone input styles
import "react-toastify/dist/ReactToastify.css"; // Toastify styles
import { ToastContainer } from "react-toastify";

// Optional: If you have a layout component, you can uncomment it
// import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <SessionProvider>
        <ThemeProvider>
          {/* <Layout> */}
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
          />
          {/* </Layout> */}
        </ThemeProvider>
      </SessionProvider>
    </NextAuthProvider>
  );
}
