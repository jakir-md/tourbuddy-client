import CreateTripForm from "@/components/modules/trip/CreateTripForm";
import TripActionGatekeeper from "@/components/shared/TripActionGateKeeper";
import { getUserInfo } from "@/services/auth/getUserInfo";

const page = async () => {
  const result = await getUserInfo();
  const isVerified = result?.isVerified;
  return (
    <div>
      {!isVerified ? (
        <div className="md:px-4 md:py-2">
          <TripActionGatekeeper isLoggedIn={true} isVerified={isVerified} />
        </div>
      ) : (
        <CreateTripForm />
      )}
    </div>
  );
};

export default page;
