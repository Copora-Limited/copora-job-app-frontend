import { useState } from "react";
import { useRouter } from "next/router";
import { verifyTwoFactor } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";

const VerifyTwoFactor = () => {
  const router = useRouter();
  const { email } = router.query; // Retrieve email from query parameters
  const [twoFactorCode, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || typeof email !== "string") {
        throw new Error("Invalid email parameter");
      }

      const response = await verifyTwoFactor(email, twoFactorCode);
      if (response.token) {
        // Save the token to local storage or context
        localStorage.setItem("token", response.token);
        if (response.user.role === "buyer") {
          router.push("/"); // Redirect to homepage or dashboard
        } else {
          router.push("/admin"); // Redirect to homepage or dashboard
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
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
        <h4 className="text-xl font-bold mb-6 text-center uppercase">
          Two-Factor Verification
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-lg font-medium mb-2">
              Enter 2FA Code*
            </label>
            <input
              type="text"
              id="code"
              value={twoFactorCode}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-secondary text-white rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-secondary transition"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-secondary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyTwoFactor;
