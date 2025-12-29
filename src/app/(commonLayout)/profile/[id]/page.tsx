import React from "react";
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
import { fetchAllUserTrips, getProfileTrips } from "@/services/user/trip";

// Mock Data Fetchers (Replace these with your Prisma Queries)
// async function getUserProfile(id: string) {
//   // prisma.user.findUnique({ where: { id }, include: { _count: { select: { tripsCreated: true, reviewsReceived: true } } } })
//   return {
//     id,
//     name: "Md Jakir Hossain",
//     email: "jakir@example.com",
//     profilePhoto:
//       "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
//     role: "USER",
//     isVerified: true,
//     bio: "Passionate traveler and photographer. I love exploring mountains and trying local cuisines. Looking for buddies for my next adventure to Europe!",
//     age: 28,
//     gender: "Male",
//     interests: ["Hiking", "Photography", "Foodie"],
//     createdAt: new Date("2024-01-15"),
//     _count: { tripsCreated: 12, reviewsReceived: 45 },
//   };
// }

// async function getUserReviews(id: string) {
//   // prisma.review.findMany({ where: { targetId: id }, include: { author: true } })
//   return [
//     {
//       id: "r1",
//       rating: 5,
//       comment: "Jakir was an amazing host! Very organized and fun.",
//       createdAt: new Date("2025-02-10"),
//       author: {
//         name: "Sarah J.",
//         profilePhoto: "https://i.pravatar.cc/150?u=1",
//       },
//     },
//     {
//       id: "r2",
//       rating: 4,
//       comment: "Great trip, but the hiking pace was a bit fast for me.",
//       createdAt: new Date("2025-01-05"),
//       author: {
//         name: "Mike T.",
//         profilePhoto: "https://i.pravatar.cc/150?u=2",
//       },
//     },
//   ];
// }

// async function getUserTrips(id: string) {
//   // prisma.trip.findMany({ where: { userId: id } })
//   return [
//     {
//       id: "t1",
//       destination: "Cairo, Egypt",
//       startDate: new Date("2025-12-05"),
//       endDate: new Date("2025-12-12"),
//       budget: 1200,
//       type: "BUSINESS",
//       photos: [
//         "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=500&q=80",
//       ],
//     },
//     {
//       id: "t2",
//       destination: "Bali, Indonesia",
//       startDate: new Date("2026-01-15"),
//       endDate: new Date("2026-01-20"),
//       budget: 800,
//       type: "LEISURE",
//       photos: [
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
//       ],
//     },
//   ];
// }

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const userInfo = await getUserInfo();
  const userid = (await params).id;
  console.log("userinfo from profile page", (await params).id);

  const [user, reviews, reviewableTrips, profileTrips] = await Promise.all([
    getUserProfile(userid),
    getUserReviews(userid),
    getReviewableTrips(userid),
    getProfileTrips(userid),
  ]);

  console.log("current user from profile page", userInfo);
  console.log("user profile from profile page", user);
  console.log("user review from profile page", reviews);
  console.log("user reviewable trips from profile page", reviewableTrips);
  // console.log("user all trips from profile page", profileTrips);

  if (!user) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        <ProfileDetails user={user.data} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Active Trips</h2>
            <UserTrips trips={profileTrips.data} />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
            <ReviewsSection
              currentUser={{ id: userInfo.id, name: userInfo.name }}
              targetUserId={userid}
              sharedTrips={reviewableTrips.data}
              reviews={reviews.data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
