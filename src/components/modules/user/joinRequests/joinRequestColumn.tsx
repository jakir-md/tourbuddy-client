import { UserInfoCell } from "@/components/shared/Cell/UserInfoCell";
import { Column } from "@/components/shared/MangementTable";
import { IJoinRequest } from "@/types/joinRequest.interface";

export const joinRequestColumn: Column<IJoinRequest>[] = [
  {
    header: "Traveler",
    accessor: (joinRequest) => (
      <UserInfoCell
        name={joinRequest.attendee.name}
        photo={joinRequest.attendee.profilePhoto}
        email={joinRequest.attendee.email}
        slug={joinRequest.attendee.id}
      />
    ),
  },
  {
    header: "Trip",
    accessor: (joinRequest) => (
      <UserInfoCell
        name={joinRequest.trip.title}
        slug={joinRequest.trip.slug}
        photo={joinRequest.trip.bannerImage}
      />
    ),
  },
  {
    header: "Status",
    accessor: (joinRequest) => <div>{joinRequest.status}</div>,
  },
];
