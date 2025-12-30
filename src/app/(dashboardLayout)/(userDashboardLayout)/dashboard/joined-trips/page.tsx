import JoinedTripsHeader from "@/components/modules/user/joinedTrips/joinedTripsHeader";
import { JoinedTripsTable } from "@/components/modules/user/joinedTrips/joinedTripsTable";
import { joinedTrips } from "@/services/joinRequest/joinRequest";

export default async function JoinedTrips() {
  const allUserTrips = await joinedTrips();
  return (
    <div className="space-y-6 px-4 pt-4">
      <JoinedTripsHeader />
      <JoinedTripsTable tripInfo={allUserTrips.data} />
    </div>
  );
}
