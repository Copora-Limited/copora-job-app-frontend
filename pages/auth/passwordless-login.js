import { useState } from "react";
import { useRouter } from "next/router";
import { sendTwoFactorCode } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";

const PasswordlessLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginType = "password-less";
      await sendTwoFactorCode(email, loginType);
      setSuccess(
        "A two-factor authentication code has been sent to your email."
      );
      setTimeout(() => {
        router.push({
          pathname: "/auth/login-with-code",
          query: { email },
        });
      }, 5000); // Redirect after 5 seconds
    } catch (error) {
      setError("Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-white p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full">
        <h4 className="text-xl font-bold mb-4 text-center uppercase">
          <Link href="/">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="md:w-[200px] w-[180px] md:h-[50px] h-[40px] mx-auto"
            />
          </Link>
        </h4>
        <h5 className="text-lg font-semibold text-center mb-6">
          Login without password
        </h5>

        <form onSubmit={handleSubmit} className="space-y-4">
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <div className="flex flex-col">
            <div className="mb-2 text-center">
              <label htmlFor="email" className=" text-sm">
                Ditch the password hassle! Enjoy secure, password-free login
              </label>
            </div>
            <input
              placeholder="Enter registered email"
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
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Back to password{" "}
            <Link href="/auth/login" className="text-secondary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordlessLogin;
