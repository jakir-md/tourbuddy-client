import { JoinRequestHeader } from "@/components/modules/user/joinRequests/JoinRequestHeader";
import { JoinRequestTable } from "@/components/modules/user/joinRequests/JoinRequestsTable";
import { getAllRequests } from "@/services/joinRequest/joinRequest";

export default async function JoinRequestPage() {
  const joinRequests = await getAllRequests();
  return (
    <div className="space-y-6 px-4 pt-4">
      <JoinRequestHeader />
      <JoinRequestTable requests={joinRequests.data} />
    </div>
  );
}