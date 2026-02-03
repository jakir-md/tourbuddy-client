import { TripStatchart } from "@/components/modules/user/overview/TripStatChart";
import UpcomingTrip from "@/components/modules/user/overview/UpComingTrip";
import UserStats from "@/components/modules/user/overview/UserStats";
import { getUserInfo } from "@/services/auth/getUserInfo";
import {
  getAnalytics,
  getUpcomingTrip,
} from "@/services/user/dashboardOverview";
import { tripWiseCountStat } from "@/services/user/trip";

const UserDashboardPage = async () => {
  const userInfo = await getUserInfo();
  const analyticsData = await getAnalytics(userInfo.id);
  const upcomingTripInfo = await getUpcomingTrip();
  const tripWiseCount = await tripWiseCountStat();
  console.log({ tripWiseCount });
  return (
    <div className="md:max-w-2xl max-w-xs mx-auto px-2">
      <UserStats data={analyticsData.data} />
      <UpcomingTrip trip={upcomingTripInfo.data} />
      <TripStatchart chartData={tripWiseCount.data} />
    </div>
  );
};

export default UserDashboardPage;
