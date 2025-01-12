// components/DashboardLayout.js
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import publicRoutes from "@/publicRoute";

const DashboardLayout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  // Check if the session is loading or if the user is unauthenticated
  useEffect(() => {
    if (
      status !== "loading" &&
      !isPublicRoute &&
      (!session || !session.user?.token) // Check for session and valid token
    ) {
      // Redirect to the login page if the session or token is not available
      router.push("/auth/login");
    }
  }, [status, session, router, isPublicRoute]);

  const userRole = session?.user?.role;
  const isApplicant = userRole === "applicant";

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);

  const toggleSideNav = () => {
    setIsSideNavOpen((prev) => !prev);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  // Detect click outside of SideNav to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        closeSideNav();
      }
    };

    if (isSideNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideNavOpen]);

  // Show a loading indicator or placeholder while session is being checked
  if (status === "loading") {
    return <div>Loading...</div>; // Replace with a better loading UI if needed
  }

  return (
    <div className="w-screen h-screen flex md:flex-row flex-col bg-[#F7F9FC] overflow-hidden">
      <TopNav onMenuClick={toggleSideNav} />
      <div className="flex w-full h-full">
        {!isPublicRoute && (
          <SideNav
            isOpen={isSideNavOpen}
            onClose={toggleSideNav}
            ref={sideNavRef}
            isApplicant={isApplicant}
          />
        )}
        <div className="flex-1 bg-white w-full h-[92vh] mt-[9vh] overflow-y-auto scroller">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
