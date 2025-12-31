import { TripApprovalHeader } from "@/components/modules/moderator/tripApproval/tripApprovalHeader";
import { TripApprovalTable } from "@/components/modules/moderator/tripApproval/tripApprovalTable";
import { fetchAllApprovals } from "@/services/moderator/tripApproval";
import { Suspense } from "react";

export default async function TripApprovalPage() {
  const tripApprovalInfo = await fetchAllApprovals();
  console.log("all approvals", tripApprovalInfo);
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <TripApprovalHeader />
        <TripApprovalTable tripInfo={tripApprovalInfo.data} />
      </Suspense>
    </div>
  );
}
