// components/SideNav.js
import React, { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  NewCandidateIcon,
  CandidateIcon,
  CloseIcon,
  SettingsIcon,
} from "./Icon";
import WhiteLogo from "./WhiteLogo";
import UserAvatar from "./UserAvatar";

const SideNav = forwardRef(({ isOpen, onClose, isApplicant }, ref) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const getLinkClass = (path) => {
    return currentPath === path
      ? "w-full h-[40px] rounded-[4px] bg-[#EBF1FD] text-secondary group flex items-center gap-2 pl-4 transition-all duration-500 hover:bg-[#EBF1FD] hover:text-secondary"
      : "w-full h-[40px] rounded-[4px] bg-secondary text-white group flex items-center gap-2 pl-4 transition-all duration-500 hover:bg-[#EBF1FD] hover:text-secondary";
  };

  const getIconClass = (path) => {
    return currentPath === path
      ? "fill-secondary "
      : "fill-[#fff] group-hover:fill-secondary";
  };

  return (
    <aside
      ref={ref}
      className={`fixed top-0 left-0 h-full w-64 bg-[#032541] text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:w-1/4 md:static md:translate-x-0 z-50 p-4`}
    >
      <div className="w-full h-full flex flex-col gap-3 justify-between">
        <div className="flex justify-between">
          <Link href="/">
            <WhiteLogo />
          </Link>
          <button onClick={onClose} className="md:hidden p-2">
            <CloseIcon />
          </button>
        </div>
        <div className="w-full h-full flex flex-col gap-3">
          {isApplicant ? (
            // Applicant navigation links
            <>
              <Link
                href="/dashboard/candidate"
                className={getLinkClass("/dashboard")}
              >
                <DashboardIcon className={getIconClass("/dashboard")} />
                <span className="mt-1">Dashboard</span>
              </Link>
              {/* Add more applicant-specific links here */}
            </>
          ) : (
            // Admin navigation links
            <>
              <Link href="/admin" className={getLinkClass("/admin")}>
                <DashboardIcon className={getIconClass("/admin")} />
                <span className="mt-1">Dashboard</span>
              </Link>
              <Link
                href="/admin/list-applicants"
                className={getLinkClass("/admin/list-applicants")}
              >
                <NewCandidateIcon
                  className={getIconClass("/admin/list-applicants")}
                />
                <span className="mt-1">New Candidate</span>
              </Link>
              {/* Add more admin-specific links here */}
            </>
          )}
          <hr />
        </div>
        <div className="w-full flex flex-col gap-3">
          {isApplicant ? (
            // Applicant navigation links
            <>
              <Link
                href="/dashboard/settings"
                className={getLinkClass("/dashboard/settings")}
              >
                <SettingsIcon className={getIconClass("/dashboard/settings")} />
                <span className="mt-1">Settings</span>
              </Link>
              {/* Add more applicant-specific links here */}
            </>
          ) : (
            <>
              <Link
                href="/admin/settings"
                className={getLinkClass("/admin/settings")}
              >
                <SettingsIcon className={getIconClass("/admin/settings")} />
                <span className="mt-1">Settings</span>
              </Link>
            </>
          )}
          <UserAvatar />
        </div>
      </div>
    </aside>
  );
});

export default SideNav;
