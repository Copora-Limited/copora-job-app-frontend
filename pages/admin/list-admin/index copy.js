import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

import {
  faEllipsisVertical,
  faEdit,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "@/components/DashboardLayout";

const ListUsersPage = () => {
  const { darkMode } = useTheme();
  const role = "admin";
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const fetchUsers = async (token) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load users.");
      }

      const data = await response.json();
      // Filter users to include only those with role "admin"
      const filteredUsers = Array.isArray(data)
        ? data.filter((user) => user.role === "admin")
        : [];
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    const getSessionData = async () => {
      const session = await getSession();
      const token = session?.user?.token; // Assumes token is stored in session

      if (!token) {
        setError("User session not found.");
        setLoading(false);
        return;
      }

      await fetchUsers(token);
    };

    getSessionData();
  }, []);

  const handleDelete = async (userId) => {
    const session = await getSession();
    const token = session?.user?.token;

    if (!token) {
      alert("User session is not available. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message ||
            `Error ${response.status}: Unable to delete user`
        );
      }

      // Update the user list after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.message || "Failed to delete user.");
    }
  };

  return (
    <DashboardLayout>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={loading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div
        className={`${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white-100 text-gray-900"
        } min-h-screen`}
      >
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">All Admin Users</h1>
            <Link
              href={`/admin/create?role=${role}`}
              className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Create New
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-4 border-b">#</th>
                  <th className="p-4 border-b">First Name</th>
                  <th className="p-4 border-b">Middle Name</th>
                  <th className="p-4 border-b">Last Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Account Status</th>
                  <th className="p-4 border-b">Role</th>
                  <th className="p-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="p-4 border-b">{index + 1}</td>
                    <td className="p-4 border-b">{user.firstName}</td>
                    <td className="p-4 border-b">{user.middleName || "N/A"}</td>
                    <td className="p-4 border-b">{user.lastName}</td>
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">
                      {user.accountStatus ? (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="p-4 border-b">
                      {user.role === "admin" ? (
                        <span className="text-green-600 font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="text-black-600 font-semibold">
                          Applicant
                        </span>
                      )}
                    </td>
                    <td className="p-4 border-b text-right">
                      <Menu as="div" className="">
                        <Menu.Button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                          <FontAwesomeIcon icon={faEllipsisVertical} />
                        </Menu.Button>
                        <Menu.Items className="absolute z-100 right-14 w-40 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                          <div className="p-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={`/admin/list-admin/view/${user.id}`}
                                  className={`${
                                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                                  } flex items-center w-full p-2 text-gray-900 dark:text-gray-100`}
                                >
                                  <FontAwesomeIcon icon={faEye} />{" "}
                                  <span className="ms-2">View</span>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href={`/admin/list-admin/${user.id}`}
                                  className={`${
                                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                                  } flex items-center w-full p-2 text-gray-900 dark:text-gray-100`}
                                >
                                  <FontAwesomeIcon icon={faEdit} />{" "}
                                  <span className="ms-2">Edit</span>
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className={`${
                                    active ? "bg-gray-100 dark:bg-gray-600" : ""
                                  } flex items-center w-full p-2 text-gray-900 dark:text-gray-100`}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />{" "}
                                  <span className="ms-2">Delete</span>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListUsersPage;
