import CreateTripWizard from "@/components/modules/trip/CreateTripWizard";
import TripDetailsView from "@/components/modules/trip/TripDetails";

const page = () => {
  return (
    <div>
      <CreateTripWizard />
      <TripDetailsView />
    </div>
  );
};

export default page;