"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function JoinedTripsHeader() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <ManagementPageHeader
        title="Trips You Joined"
        description="Your all Joined trips are shown here."
        action={{
          onClick: handleRefresh,
          label: "Refresh",
          icon: RefreshCcw,
        }}
      />
    </>
  );
}
