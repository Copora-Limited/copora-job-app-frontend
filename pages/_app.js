// src/pages/_app.js
import "antd/dist/reset.css"; // or the older 'antd/dist/antd.css' if needed
import "./globals.css";
// import { AppProps } from "next/app";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/context/SessionContext";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
