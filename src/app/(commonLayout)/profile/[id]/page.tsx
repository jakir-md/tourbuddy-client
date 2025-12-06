import React from "react";
import { notFound } from "next/navigation";
import ProfileDetails from "@/components/modules/user/userProfile/ProfileDetails";
import UserTrips from "@/components/modules/user/userProfile/UserTrips";
import ReviewsSection from "@/components/modules/user/userProfile/ReviewSection";

// Mock Data Fetchers (Replace these with your Prisma Queries)
async function getUserProfile(id: string) {
  // prisma.user.findUnique({ where: { id }, include: { _count: { select: { tripsCreated: true, reviewsReceived: true } } } })
  return {
    id,
    name: "Md Jakir Hossain",
    email: "jakir@example.com",
    profilePhoto:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80",
    role: "USER",
    isVerified: true,
    bio: "Passionate traveler and photographer. I love exploring mountains and trying local cuisines. Looking for buddies for my next adventure to Europe!",
    age: 28,
    gender: "Male",
    interests: ["Hiking", "Photography", "Foodie"],
    createdAt: new Date("2024-01-15"),
    _count: { tripsCreated: 12, reviewsReceived: 45 },
  };
}

async function getUserReviews(id: string) {
  // prisma.review.findMany({ where: { targetId: id }, include: { author: true } })
  return [
    {
      id: "r1",
      rating: 5,
      comment: "Jakir was an amazing host! Very organized and fun.",
      createdAt: new Date("2025-02-10"),
      author: {
        name: "Sarah J.",
        profilePhoto: "https://i.pravatar.cc/150?u=1",
      },
    },
    {
      id: "r2",
      rating: 4,
      comment: "Great trip, but the hiking pace was a bit fast for me.",
      createdAt: new Date("2025-01-05"),
      author: {
        name: "Mike T.",
        profilePhoto: "https://i.pravatar.cc/150?u=2",
      },
    },
  ];
}

async function getUserTrips(id: string) {
  // prisma.trip.findMany({ where: { userId: id } })
  return [
    {
      id: "t1",
      destination: "Cairo, Egypt",
      startDate: new Date("2025-12-05"),
      endDate: new Date("2025-12-12"),
      budget: 1200,
      type: "BUSINESS",
      photos: [
        "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=500&q=80",
      ],
    },
    {
      id: "t2",
      destination: "Bali, Indonesia",
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-01-20"),
      budget: 800,
      type: "LEISURE",
      photos: [
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80",
      ],
    },
  ];
}

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch data in parallel for performance
  const [user, reviews, trips] = await Promise.all([
    getUserProfile(params.id),
    getUserReviews(params.id),
    getUserTrips(params.id),
  ]);

  if (!user) return notFound();
  const sharedTrips = [
    { id: "10101", destination: "rangpur", startDate: new Date("2025-05-10") },
  ];
  return (
    <div className="min-h-screen bg-slate-50/50 py-10">
      <div className="container mx-auto px-4 space-y-8">
        {/* 1. Top Section: Profile Details */}
        <ProfileDetails user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Left Column: Trips (Takes up 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Active Trips</h2>
            <UserTrips trips={trips} />
          </div>

          {/* 3. Right Column: Reviews (Takes up 1 col) */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
            <ReviewsSection
              currentUser={{ id: params.id, name: "Jakir" }}
              targetUserId="id"
              sharedTrips={sharedTrips}
              reviews={reviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
