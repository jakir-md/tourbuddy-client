import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/MangementTable";
import { IUserAllTrips } from "@/types/trip.interface";

export const AllTripsColumn: Column<IUserAllTrips>[] = [
  {
    header: "Trip",
    accessor: (approvingTrip) => (
      <UserInfoCell
        name={approvingTrip.trip.title}
        slug={approvingTrip.trip.slug}
        photo={approvingTrip.trip.bannerImage}
      />
    ),
  },
  {
    header: "Status",
    accessor: (approvingTrip) => <div>{approvingTrip.approveStatus}</div>,
  },
  {
    header: "Message",
    accessor: (approvingTrip) => <div>{approvingTrip.message}</div>,
  },
];