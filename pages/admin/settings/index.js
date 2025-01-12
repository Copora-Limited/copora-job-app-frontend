import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

export default function Settings() {
  const [isLoading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  return (
    <DashboardLayout>
      {/* {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )} */}
      <div className="w-full p-4">Settings Page</div>
    </DashboardLayout>
  );
}
