import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/MangementTable";
import TripStatusTimer from "@/components/shared/TripStatusTimer";
import { IUserAllTrips } from "@/types/trip.interface";

export interface IJoinedTrips {
  trip: {
    id: string;
    title: string;
    startDate: string;
    approveStatus: string;
    slug: string;
    bannerImage: string;
    endDate: string;
  };
}

export const JoinedTripsColumn: Column<IJoinedTrips>[] = [
  {
    header: "Trip",
    accessor: (joinedTrip) => (
      <UserInfoCell
        name={joinedTrip.trip.title}
        slug={joinedTrip.trip.slug}
        photo={joinedTrip.trip.bannerImage}
      />
    ),
  },
  {
    header: "Status",
    accessor: (joinedTrip) => <div>{joinedTrip.trip.approveStatus}</div>,
  },
  {
    header: "CountDown",
    accessor: (joinedTrip) => (
      <TripStatusTimer
        // startDate={joinedTrip.trip.startDate}
        // endDate={joinedTrip.trip.endDate}
        startDate={"2025-12-30"}
        endDate={"2026-01-03"}
      />
    ),
  },
];
