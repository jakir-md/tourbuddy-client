import { JoinRequestHeader } from "@/components/modules/user/joinRequests/JoinRequestHeader";
import { JoinRequestTable } from "@/components/modules/user/joinRequests/JoinRequestsTable";
import TablePagination from "@/components/shared/TablePagination";
import { getAllRequests } from "@/services/joinRequest/joinRequest";
import { Suspense } from "react";

export default async function JoinRequestPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const param = await searchParams;
  const joinRequests = await getAllRequests(param);
  const totalPages = Math.ceil(
    (joinRequests.meta.total || 1) / (joinRequests.meta.limit || 1)
  );
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <JoinRequestHeader />
        <JoinRequestTable requests={joinRequests.data} />
        <TablePagination
          totalPages={totalPages}
          currentPage={joinRequests?.meta.page}
        />
      </Suspense>
    </div>
  );
}