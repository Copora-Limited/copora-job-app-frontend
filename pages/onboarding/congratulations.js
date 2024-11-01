import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function OnboardingLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without redirecting
    router.push("/auth/login"); // Redirect to the sign-in page or any other page
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center border">
        <img src="/assets/final-animation.gif" alt="complete animation" />

        <h3 className="md:text-[32px] font-semibold text-[25px] text-primary">
          Congratulations! 🎊
        </h3>
        <p className="md:text-[24px] font-normal text-[19px] text-[#475467]">
          Your boarding has been completed
        </p>

        <button
          onClick={handleLogout} // Replace `signOut` with your actual logout function
          className="mt-6 px-6 py-3 text-white bg-primary rounded-md text-[16px] font-semibold hover:bg-primary-dark"
        >
          Logout
        </button>
      </div>
    </>
  );
}
