import AllTripsHeader from "@/components/modules/user/allTrips/allTripsHeader";
import { AllTripsTable } from "@/components/modules/user/allTrips/allTripsTable";
import TablePagination from "@/components/shared/TablePagination";
import { fetchAllUserTrips } from "@/services/user/trip";
import { Suspense } from "react";

export default async function FetchAllUserTrips() {
  const allUserTrips = await fetchAllUserTrips();
  const totalPages = Math.ceil(
    allUserTrips.meta.total || 1 / allUserTrips.meta.limit || 1
  );
  return (
    <div className="space-y-6 px-4 pt-4">
      <Suspense fallback={<div>Loading...</div>}>
        <AllTripsHeader />
        <AllTripsTable tripInfo={allUserTrips.data} />
        <TablePagination
          totalPages={totalPages}
          currentPage={allUserTrips?.meta.page}
        />
      </Suspense>
    </div>
  );
}
