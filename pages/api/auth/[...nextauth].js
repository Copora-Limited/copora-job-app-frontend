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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();

          if (res.ok && data.user) {
            // Return user object if authentication is successful
            return {
              id: data.user.userId,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              role: data.user.role,
              resetPassword: data.user.resetPassword,
              applicationNo: data.user.applicationNo,
              onboardingStep: data.user.onboardingStep,
              profilePicture: data.user.profilePicture,
              token: data.token, // Store the token from the response
            };
          } else {
            // Handle different error responses from the backend
            if (data.statusCode == 400 || data.statusCode == 401) {
              throw new Error(data.message);
            } else {
              throw new Error("Authentication failed", data.message);
            }
          }
        } catch (error) {
          // Console log the error for debugging purposes
          console.error("Error in authorize function:", error.message);
          throw new Error(error.message); // Propagate the error to NextAuth
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
      if (user) {
        // token.id = user.id;
        token.name = user.firstName + " " + user.lastName;
        token.email = user.email;
        token.role = user.role;
        token.resetPassword = user.resetPassword;
        token.applicationNo = user.applicationNo;
        token.onboardingStep = user.onboardingStep;
        // token.profilePicture = user.profilePicture;
        token.token = user.token; // Storing the token in the session
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        // id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        resetPassword: token.resetPassword,
        applicationNo: token.applicationNo,
        onboardingStep: token.onboardingStep,
        // profilePicture: token.profilePicture,
        token: token.token,
      };
      return session;
    },
  },
});
