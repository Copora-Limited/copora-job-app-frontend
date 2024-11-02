// pages/admin/list-users.tsx
import { useEffect, useState, useRef } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import UserTable from "@/components/dashboard/UserTable";
import TableActions from "@/components/dashboard/TableActions";
import DashboardLayout from "@/components/DashboardLayout";

const ListUsersPage = () => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
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
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const adminUsers = data.filter((user) => user.role === "applicant");
        setUsers(adminUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
    setIsMounted(true);
  }, [token]);
  const handleUploadClick = () => {
    console.log("Upload clicked");
    // Add logic to handle file upload
  };

  const handleExportClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/applicant/download/csv`,
        {
          method: "GET",
          headers: {
            "Content-Type": "text/csv",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch the CSV file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      {isLoading ? (
        // <CircleSpinnerOverlay loading={isLoading} />
        <>Loading</>
      ) : (
        <>
          <TableActions
            onUploadClick={handleUploadClick}
            onExportClick={handleExportClick}
          />
          <UserTable users={users} />
        </>
      )}
    </DashboardLayout>
  );
};

export default ListUsersPage;
