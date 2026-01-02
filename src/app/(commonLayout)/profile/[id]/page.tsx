import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProfileDetails from "@/components/modules/user/userProfile/ProfileDetails";
import UserTrips from "@/components/modules/user/userProfile/UserTrips";
import ReviewsSection from "@/components/modules/user/userProfile/ReviewSection";
import { getUserInfo } from "@/services/auth/getUserInfo";
import {
  getReviewableTrips,
  getUserProfile,
  getUserReviews,
} from "@/services/user/userprofile";
import { getProfileTrips } from "@/services/user/trip";
import { getAnalytics } from "@/services/user/dashboardOverview";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userInfo = await getUserInfo();
  const userid = (await params).id;

  const [user, reviews, reviewableTrips, profileTrips, analyticsData] =
    await Promise.all([
      getUserProfile(userid),
      getUserReviews(userid),
      getReviewableTrips(userid),
      getProfileTrips(userid),
      getAnalytics(userid),
    ]);

  if (!user) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <Suspense fallback={<div>Loading Profile...</div>}>
        <div className="container mx-auto px-4 space-y-8">
          <ProfileDetails user={user.data} stats={analyticsData.data} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Active Trips
              </h2>
              <UserTrips trips={profileTrips.data} />
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
              <ReviewsSection
                currentUser={{ id: userInfo.id, name: userInfo.name }}
                targetUserId={userid}
                sharedTrips={reviewableTrips.data || []}
                reviews={reviews.data || []}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
