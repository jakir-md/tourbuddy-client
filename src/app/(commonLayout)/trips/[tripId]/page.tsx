import TripDetails from "@/components/modules/trip/TripDetails";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTripById } from "@/services/home/trips";
import {
  getJoinedProfiles,
  getJoinRequestStatus,
} from "@/services/joinRequest/joinRequest";
import { IUserInfo } from "@/types/user.interface";

const page = async ({ params }: { params: any }) => {
  const param = await params;
  const [result] = await Promise.all([getTripById(param.tripId)]);
  const joinRequest = await getJoinRequestStatus(result.data.id);
  const loginUserInfo = (await getUserInfo()) as IUserInfo;
  const joinedUsers = await getJoinedProfiles(param.tripId);
  console.log("joinedUsers", joinedUsers);
  const status = joinRequest.success ? joinRequest?.data?.status : null;
  return (
    <div>
      <TripDetails
        loginUserId={loginUserInfo.id}
        trip={result.data}
        requestStatus={status}
        joinedUsers={joinedUsers.data}
      />
    </div>
  );
};

export default page;