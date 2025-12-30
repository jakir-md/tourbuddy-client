"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { IJoinedTrips, JoinedTripsColumn } from "./joinedTripsColumn";

export function JoinedTripsTable({ tripInfo }: { tripInfo: IJoinedTrips[] }) {
  return (
    <>
      <ManagementTable
        data={tripInfo}
        columns={JoinedTripsColumn}
        getRowKey={(tripInfo) => tripInfo.trip.id!}
        emptyMessage="No Records Found"
      />
    </>
  );
}
