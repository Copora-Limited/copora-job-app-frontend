import React from "react";
// import { useNavigate } from "react-router-dom";
import { useSession, signOut } from "next-auth/react";

import useOnboardingStore from "@/hooks/Store/useOnboardingStore";
// import { useOnboardingContext } from "@/hooks/useContexts";
// import UserAvatar from "@/assets/user-avatar.svg";
import Link from "next/link";

export default function OnboardingTopNav() {
  const { data: session } = useSession();
  // const navigate = useNavigate();
  // const { setIsSideBarOpen } = useOnboardingContext();
  // const profilePic = useOnboardingStore((state) => state.profilePic);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <nav className="bg-white shadow text-black p-4 flex justify-between md:justify-end items-center h-[8vh] fixed top-0 right-0 z-50 md:w-3/4 w-screen px-4 ">
      {/* <svg
			xmlns="http://www.w3.org/2000/svg"
			width="27"
			height="27"
			viewBox="0 0 24 24"
			className="md:hidden flex cursor-pointer"
			onClick={() => setIsSideBarOpen(true)}
		>
			<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
		</svg> */}

      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={profilePic || "/assets/user-avatar.svg"}
            alt="User avatar"
            className="w-full h-full rounded-full"
          />
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
