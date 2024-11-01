import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { sendResetPasswordEmail } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";

const ForgotPassword = () => {
  const router = useRouter();
  const { email: emailFromRoute } = router.query;

  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailFromRoute) {
      setEmail(emailFromRoute);
    }
  }, [emailFromRoute]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendResetPasswordEmail(email);
      if (response.statusCode === 200) {
        setMessage(
          "If an account with that email exists, a password reset link will be sent to it."
        );
        setEmail("");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while sending the password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-white p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full">
        <h4 className="text-xl font-bold mb-4 text-center uppercase">
          <Link href="/" className="text-secondary">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </h4>

        <>
          <div className="mb-4 text-2xl font-bold text-gray-600 text-center">
            Forgot Password
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && (
              <p className="text-green-500 text-center mb-4">{message}</p>
            )}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-lg">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded bg-secondary text-white hover:bg-teal-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Password Reset Email"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Back to{" "}
              <Link href="/auth/login" className="text-secondary">
                login
              </Link>
              <span className="px-2">or</span>
              <Link href="/signup" className="text-secondary">
                Register
              </Link>
            </p>
          </div>
        </>
      </div>
    </div>
  );
};

export default ForgotPassword;
