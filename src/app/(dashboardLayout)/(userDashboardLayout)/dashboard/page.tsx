import UpcomingTrip from "@/components/modules/user/overview/UpComingTrip";
import UserStats from "@/components/modules/user/overview/UserStats";
import {
  getAnalytics,
  getUpcomingTrip,
} from "@/services/user/dashboardOverview";

const UserDashboardPage = async () => {
  const analyticsData = await getAnalytics();
  const upcomingTripInfo = await getUpcomingTrip();

  console.log({ analyticsData, upcomingTripInfo });
  return (
    <div className="md:max-w-2xl max-w-xs mx-auto px-2">
      <UserStats data={analyticsData.data} />
      <UpcomingTrip trip={upcomingTripInfo.data} />
    </div>
  );
};

export default UserDashboardPage;
