// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.user) {
            return {
              ...data.user,
              token: data.token, // Add custom token to user object
              exp: Math.floor(Date.now() / 1000) + 30 * 60, // 30-minute expiration in seconds
            };
          }

          // Handle error responses
          throw new Error(data.message || "Authentication failed");
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, merge user data with the token
      if (user) {
        token = { ...token, ...user };
      }

      // Check token expiration and return null if expired
      if (Date.now() >= (token.exp || 0) * 1000) {
        console.log("Token has expired");
        return null; // Forces logout if token is expired
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token; // Add token data to session for client-side access
      return session;
    },
  },
  session: {
    maxAge: 30 * 60, // Session duration: 30 minutes in seconds
    updateAge: 5 * 60, // Extend session when user is active: 5 minutes in seconds
  },
});
