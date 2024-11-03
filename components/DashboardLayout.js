// components/DashboardLayout.js
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import publicRoutes from "@/publicRoute";

const DashboardLayout = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);
  const userRole = session?.user?.role;

  // console.log(userRole);
  const isApplicant = userRole === "applicant";

  console.log("isApplicant", isApplicant);

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

  return (
    <div className="w-screen h-screen flex md:flex-row flex-col bg-[#F7F9FC] overflow-hidden">
      <TopNav onMenuClick={toggleSideNav} />
      <div className="flex w-full h-full">
        {!isPublicRoute && (
          <SideNav
            isOpen={isSideNavOpen}
            onClose={toggleSideNav}
            isApplicant={isApplicant}
            ref={sideNavRef}
          />
        )}
        <div className="flex-1 w-full h-[92vh] mt-[9vh] overflow-y-auto scroller">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
