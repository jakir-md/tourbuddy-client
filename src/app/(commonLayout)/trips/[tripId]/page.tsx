import TripDetails from "@/components/modules/trip/TripDetails";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getTripById } from "@/services/home/trips";
import {
  getJoinedProfiles,
  getJoinRequestStatus,
} from "@/services/joinRequest/joinRequest";
import { IUserInfo } from "@/types/user.interface";
import { Suspense } from "react";

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
      <Suspense fallback={<div>Loading...</div>}>
        <TripDetails
          loginUserId={loginUserInfo.id}
          trip={result.data}
          requestStatus={status}
          joinedUsers={joinedUsers.data}
        />
      </Suspense>
    </div>
  );
};

export default page;
