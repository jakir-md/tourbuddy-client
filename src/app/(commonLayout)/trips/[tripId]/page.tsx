import TripDetails from "@/components/modules/trip/TripDetails";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTripById } from "@/services/home/trips";
import { getJoinRequestStatus } from "@/services/joinRequest/joinRequest";
import { IUserInfo } from "@/types/user.interface";

const page = async ({ params }: { params: any }) => {
  const param = await params;
  const result = await getTripById(param.tripId);
  const joinRequest = await getJoinRequestStatus(param.tripId);
  const loginUserInfo = (await getUserInfo()) as IUserInfo;
  const status = joinRequest.success ? joinRequest?.data?.status : null;
  return (
    <div>
      <TripDetails
        loginUserId={loginUserInfo.id}
        trip={result.data}
        requestStatus={status}
      />
    </div>
  );
};

export default page;
