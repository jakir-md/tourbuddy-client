import AllTripsHeader from "@/components/modules/user/allTrips/allTripsHeader";
import { AllTripsTable } from "@/components/modules/user/allTrips/allTripsTable";
import { fetchAllUserTrips } from "@/services/user/trip";

export default async function FetchAllUserTrips() {
  const allUserTrips = await fetchAllUserTrips();
  console.log("user trips", allUserTrips);
  return (
    <div className="space-y-6 px-4 pt-4">
      <AllTripsHeader />
      <AllTripsTable tripInfo={allUserTrips.data} />
    </div>
  );
}
