import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Redirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  const motivationalMessages = [
    "Stay positive, work hard, make it happen!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "Believe you can, and you’re halfway there.",
    "Good things come to those who hustle.",
    "Every day is a fresh start, take a deep breath and start again.",
    "Your only limit is your mind.",
    "Focus on the journey, not the destination.",
    "Push yourself, because no one else is going to do it for you.",
    "The only way to do great work is to love what you do.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(
        (prevIndex) => (prevIndex + 1) % motivationalMessages.length
      );
    }, 3000); // Change message every 3 seconds

    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      const { role, onboardingStep } = session.user;
      if (role === "applicant") {
        if (onboardingStep < 11) {
          router.push(`/onboarding?step=${onboardingStep}`);
        } else {
          router.push("/onboarding/congratulations");
        }
      } else if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      router.push("/auth/login");
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [status, session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">
          Redirecting...
        </h1>
        <p className="text-gray-500 mb-6">
          {motivationalMessages[messageIndex]}
        </p>
        <svg
          className="animate-spin h-12 w-12 text-blue-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            d="M4 12a8 8 0 018-8v0a8 8 0 010 16v0a8 8 0 01-8-8z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Redirect;
