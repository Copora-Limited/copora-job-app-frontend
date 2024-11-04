import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaAsterisk } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectTimeout, setRedirectTimeout] = useState(5);
  const [showRedirectButton, setShowRedirectButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Example state for dark mode
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Check for the "message" in localStorage and set the error state if it matches "timeout"
    if (localStorage.getItem("message") === "timeout") {
      setError("Session timed out due to inactivity.");
      // Optionally, clear the message from localStorage if you want to show it only once
      localStorage.removeItem("message");
    }
  }, []); // Only run once when the component mounts

  useEffect(() => {
    let timer;

    if (redirectTimeout > 0 && showRedirectButton) {
      timer = setInterval(() => {
        setRedirectTimeout((prev) => prev - 1);
      }, 1000);
    }

    if (redirectTimeout === 0) {
      router.push(`/verify-two-factor-code?email=${encodeURIComponent(email)}`);
    }

    return () => timer && clearInterval(timer);
  }, [redirectTimeout, showRedirectButton, router, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authenticateUser(email, password);

      if (result?.ok) {
        handleSuccess(result);
      } else {
        handleError(result);
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const authenticateUser = async (email, password) => {
    return await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  const handleSuccess = (result) => {
    if (result.status === 200) {
      redirectUser(result?.data?.role);
    } else if (result.status === 403) {
      router.push(`/auth/forget-password?email=${email}`);
    } else {
      setError(
        "Two Factor Authentication is enabled. Please verify your code."
      );
      setShowRedirectButton(true);
    }
  };

  const handleError = (result) => {
    setError(result.error || "Login failed");
  };

  const redirectUser = (role) => {
    router.push("/redirect");
  };

  const handleRedirectNow = () => {
    router.push(`/login-with-code?email=${encodeURIComponent(email)}`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-white p-4">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-md w-full">
        {/* <h4 className="text-xl font-bold mb-4 text-center uppercase"> */}
        <Link href="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="md:w-[200px] w-[180px] md:h-[50px] h-[40px] mx-auto"
          />
        </Link>
        {/* </h4> */}
        <div className="mt-3">
          <h5 className="md:text-[18px] text-[16px] text-primary font-bold text-center">
            Welcome
          </h5>
          <p className="md:text-[14px] text-[12px] text-[#475467] text-center">
            Kindly enter your credentials to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="md:text-[14px] text-[12px] text-[#344054] font-medium flex items-center gap-1"
            >
              Email
              <span className="text-red-600">
                <FaAsterisk size={6} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full md:h-[40px] h-[35px] rounded-[8px] border border-[#D0D5DD] py-[8px] px-[14px] outline-0 placeholder:text-[#667085] placeholder:text-[14px] text-[14px] text-black"
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className="md:text-[14px] text-[12px] text-[#344054] font-medium flex items-center gap-1"
            >
              Password
              <span className="text-red-600">
                <FaAsterisk size={6} />
              </span>
            </label>

            <div className="w-full md:h-[40px] h-[35px] flex items-center justify-between rounded-[8px] border border-[#D0D5DD] py-[8px] px-[14px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`outline-0 border-0 w-full h-full placeholder:text-[#667085] placeholder:text-[14px] text-[14px] text-[#667085] ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-cyan-600"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-cyan-500"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className=""
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />
              </button>
            </div>

            {/* <div className="w-full flex items-center justify-between-end mt-1"> */}
            <Link
              href="/auth/forgot-password"
              className=" float-end my-2 cursor-pointer transition-all duration-500 text-teal-600 hover:text-secondary text-[12px] md:text-[14px]"
            >
              Forgot Password ?
            </Link>
            {/* </div> */}
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded bg-appGreen hover:bg-teal-700 transition duration-500 text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {isMounted && (
            <p className="w-full text-[12px] text-appMuted text-center">
              By continuing you agree to {process.env.NEXT_PUBLIC_APP_NAME}'s{" "}
              <Link
                href="/"
                className="text-appGreen cursor-pointer transition-all duration-500 hover:text-teal-600"
              >
                Terms of use
              </Link>
            </p>
          )}
        </form>

        {showRedirectButton && (
          <div className="text-center mt-4">
            <p>Redirecting in {redirectTimeout} seconds...</p>
            <button
              className="mt-4 p-2 rounded bg-secondary text-white hover:bg-teal-700 transition"
              onClick={handleRedirectNow}
            >
              Redirect Now
            </button>
          </div>
        )}
        {/* <div className="mt-4 text-center my-4 border-t border-gray-300 pt-4">
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-secondary">
              Register
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
