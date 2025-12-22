"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function AllTripsHeader() {
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
        title="Trips History"
        description="Your all trips are shown here."
        action={{
          onClick: handleRefresh,
          label: "Refresh",
        }}
      />
    </>
  );
}
