"use client";

import { ManagementTable } from "@/components/shared/MangementTable";
import { AllTripsColumn } from "./allTripsColumn";
import { IUserAllTrips } from "@/types/trip.interface";

export function AllTripsTable({ tripInfo }: { tripInfo: IUserAllTrips[] }) {
  return (
    <>
      <ManagementTable
        data={tripInfo}
        columns={AllTripsColumn}
        getRowKey={(tripInfo) => tripInfo.id!}
      />
    </>
  );
}
