import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { resetPassword } from "@/hooks/useAuth"; // Adjust path as necessary
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(null); // Track token validation status
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Example state for dark mode

  useEffect(() => {
    if (typeof token === "string") {
      if (token) {
        setIsTokenValid(true); // Token exists, set as valid
      } else {
        setError("No token found.");
        setIsTokenValid(false); // Token does not exist
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isTokenValid === false) {
      setError("No token found.");
      setLoading(false);
      return;
    }

    if (!isTokenValid) {
      setError("Token is loading, please wait.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid or missing token");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, password);
      if (response.statusCode === 200) {
        setMessage(
          "Password has been reset successfully. Redirecting to login page..."
        );
        setTimeout(() => {
          router.push("/auth/login");
        }, 10000);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <div className="mb-4 text-2xl font-bold text-gray-600 text-center">
          Reset Password
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mb-4">{message}</p>
          )}
          <div
            className={`relative mb-6 w-full flex items-center justify-between rounded-lg border py-2 px-4 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } md:h-10 h-9`}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`outline-none border-none w-full h-full placeholder:text-gray-400 text-sm ${
                isDarkMode
                  ? "text-white focus:ring-cyan-600"
                  : "text-gray-900 focus:ring-cyan-500"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              />
            </button>
          </div>
          <div
            className={`relative mb-6 w-full flex items-center justify-between rounded-lg border py-2 px-4 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            } md:h-10 h-9`}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`outline-none border-none w-full h-full placeholder:text-gray-400 text-sm ${
                isDarkMode
                  ? "text-white focus:ring-cyan-600"
                  : "text-gray-900 focus:ring-cyan-500"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={`h-5 w-5 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded bg-appGreen hover:bg-teal-700 transition duration-500 text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-appGreen cursor-pointer transition-all duration-500 hover:text-teal-600"
            >
              Login
            </Link>
          </p>
          Back to{" "}
          <span>
            <Link
              href="/auth/forgot-password"
              className="text-appGreen cursor-pointer transition-all duration-500 hover:text-teal-600"
            >
              Forgot Password
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
