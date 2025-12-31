import { JoinRequestHeader } from "@/components/modules/user/joinRequests/JoinRequestHeader";
import { JoinRequestTable } from "@/components/modules/user/joinRequests/JoinRequestsTable";
import { getAllRequests } from "@/services/joinRequest/joinRequest";
import { Suspense } from "react";

export default async function JoinRequestPage() {
  const joinRequests = await getAllRequests();
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <JoinRequestHeader />
        <JoinRequestTable requests={joinRequests.data} />
      </Suspense>
    </div>
  );
}