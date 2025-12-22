import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/MangementTable";
import { ITripApprovalInfo } from "@/types/tripApproval.interface";

export const tripApprovalColumn: Column<ITripApprovalInfo>[] = [
  {
    header: "Traveler",
    accessor: (approvingTrip) => (
      <UserInfoCell
        name={approvingTrip.user.name}
        photo={approvingTrip.user.profilePhoto}
        email={approvingTrip.user.email}
        slug={approvingTrip.user.username}
      />
    ),
  },
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
];
