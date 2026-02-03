import JoinedTripsHeader from "@/components/modules/user/joinedTrips/joinedTripsHeader";
import { JoinedTripsTable } from "@/components/modules/user/joinedTrips/joinedTripsTable";
import TablePagination from "@/components/shared/TablePagination";
import { joinedTrips } from "@/services/joinRequest/joinRequest";
import { Suspense } from "react";

export default async function JoinedTrips({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const param = await searchParams;
  const allUserTrips = await joinedTrips(param);
  const totalPages = Math.ceil(
    (allUserTrips.meta.total || 1) / (allUserTrips.meta.limit || 1)
  );
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <JoinedTripsHeader />
        <JoinedTripsTable tripInfo={allUserTrips.data} />
        <TablePagination
          totalPages={totalPages}
          currentPage={allUserTrips?.meta.page}
        />
      </Suspense>
    </div>
  );
}
