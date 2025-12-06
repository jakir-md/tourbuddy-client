// import TripDetailsView from "@/components/modules/trip/TripDetails";
import TripDetails from "@/components/modules/trip/TripDetails";
import { getTripById } from "@/services/home/trips";

const page = async ({ params }: { params: any }) => {
  const param = await params;
  const result = await getTripById(param.tripId);
  return (
    <div>
      <TripDetails trip={result.data} />
    </div>
  );
};

export default page;
