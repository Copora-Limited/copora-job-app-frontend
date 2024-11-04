import { useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { publicRoutes } from "./publicRoutes";

const SessionTimeout = ({ timeout = 10000 }) => {
  // Timeout in milliseconds (e.g., 10 seconds for testing)
  const router = useRouter();
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    // console.log("User activity detected. Resetting timeout.");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      // console.log("Previous timeout cleared.");
    }

    // Apply the timeout only if the user is not on a public route
    if (!publicRoutes.includes(router.pathname)) {
      timeoutRef.current = setTimeout(() => {
        console.log("User inactive. Signing out due to inactivity.");
        localStorage.setItem("message", "timeout");
        signOut({ callbackUrl: "/auth/login" });
      }, timeout);
      console.log(`New timeout set for ${timeout / 1000} seconds.`);
    } else {
      // console.log("User is on a public route. Timeout not applied.");
    }
  };

  useEffect(() => {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    const resetTimeoutHandler = () => resetTimeout();

    for (const event of events) {
      window.addEventListener(event, resetTimeoutHandler);
      console.log(`Event listener added for ${event}`);
    }

    resetTimeout(); // Initialize timeout on component mount

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimeoutHandler);
        console.log(`Event listener removed for ${event}`);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("Timeout cleared on cleanup.");
      }
    };
  }, [router.pathname]);

  return null;
};

export default SessionTimeout;
