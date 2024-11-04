import React from "react";
import { useSession, signOut } from "next-auth/react";
import useOnboardingStore from "@/hooks/Store/useOnboardingStore";
import Link from "next/link";

export default function OnboardingTopNav() {
  const { data: session } = useSession();
  const profilePic = useOnboardingStore((state) => state.profilePic); // Uncommented this line

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white shadow text-black p-4 flex justify-between md:justify-end items-center h-[8vh] fixed top-0 right-0 z-50 md:w-3/4 w-screen px-4">
      <div className="flex items-center gap-4">
        <div className="w-[40px] h-[40px] rounded-full">
          <img
            src={profilePic || "/assets/user-avatar.svg"} // Fallback to default avatar if profilePic is missing
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
