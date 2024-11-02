// components/SideNav.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DashboardIcon,
  NewCandidateIcon,
  CandidateIcon /* , other icons */,
} from "./Icon";

const SideNav = ({ isApplicant }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // console.log("currentPath", currentPath);

  const getLinkClass = (path) => {
    return currentPath == path
      ? "w-full h-[40px] rounded-[4px] bg-secondary text-white hover:bg-[#EBF1FD] group hover:text-secondary flex items-center gap-2 pl-4 transition-all duration-500"
      : "w-full h-[40px] rounded-[4px]  text-white group flex items-center gap-2 pl-4 transition-all duration-500";
  };

  const getIconClass = (path) => {
    return currentPath == path
      ? "fill-[#fff] group-hover:fill-secondary"
      : "fill-[#fff]";
  };

  return (
    <aside className="md:w-1/4 h-full md:flex hidden md:flex-col gap-4 overflow-y-auto scroller bg-[#032541] p-4">
      <div className="w-full h-full flex flex-col gap-3 justify-between">
        <div className="w-full h-full flex flex-col gap-3">
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
          <Link
            href="/dashboard/candidate"
            className={getLinkClass("/candidate")}
          >
            <CandidateIcon className={getIconClass("/candidate")} />
            <span className="mt-1">Candidate</span>
          </Link>
          {/* Add more links as needed */}
          <hr />
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
