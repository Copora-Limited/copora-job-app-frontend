import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@/context/SessionContext"; // Use the custom session context
import DashboardLayout from "@/components/DashboardLayout";

export default function RegisterApplicant() {
  const router = useRouter();
  const [role, setRole] = useState("applicant");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useSessionContext(); // Assuming you have a custom session context

  useEffect(() => {
    if (router.query.role) {
      setRole(router.query.role);
    }
  }, [router.query.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      if (!token) {
        throw new Error("User session is not available. Please log in again.");
      }

      const payload = {
        firstName,
        lastName,
        email,
        password,
        accountStatus: false,
        role,
        createdBy: "admin",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `Error: ${response.status}`);
      }

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin/list-admin");
      } else {
        router.push("/admin/list-applicants");
      }
    } catch (error) {
      if (error.name === "SyntaxError") {
        setError("Failed to parse server response. Please try again later.");
      } else if (error.message.includes("NetworkError")) {
        setError(
          "Network error occurred. Please check your connection and try again."
        );
      } else {
        setError(error.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full ">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Register New User
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-2 text-lg">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-2 text-lg">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-gray-700 font-semibold mb-2"
              >
                Role
              </label>
              {/* <select
								id="role"
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option value="admin">Admin</option>
								<option value="applicant">Applicant</option>
							</select> */}
              <input
                id="role"
                value={role}
                readOnly
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
