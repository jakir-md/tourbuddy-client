"use client";

import React from "react";
import Link from "next/link";
import { Star, MapPin, Trophy, UserPlus, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// 1. Mock Data (Fetch from prisma.user.findMany({ orderBy: { rating: 'desc' }, take: 3 }))
const topTravelers = [
  {
    id: "user-2",
    rank: 2,
    name: "Sarah Chen",
    username: "@sarah_travels",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 142,
    tripsLed: 24,
    location: "Singapore",
    badges: ["Photographer", "Foodie"],
  },
  {
    id: "user-1",
    rank: 1, // The Champion
    name: "Alex Morgan",
    username: "@alex_explorer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 215,
    tripsLed: 42,
    location: "New York, USA",
    badges: ["Super Host", "Hiker"],
  },
  {
    id: "user-3",
    rank: 3,
    name: "Marcus Johnson",
    username: "@marcus_j",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 98,
    tripsLed: 18,
    location: "London, UK",
    badges: ["History Buff"],
  },
];

export default function TopTravelers() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-amber-500 font-medium bg-amber-50 w-fit mx-auto px-3 py-1 rounded-full text-sm">
            <Trophy className="w-4 h-4" /> Community Legends
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Top Rated Travelers 🌟
          </h2>
          <p className="text-slate-600 text-lg">
            Meet the most experienced hosts and travel buddies who make every
            trip unforgettable.
          </p>
        </div>

        {/* The Podium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
          {/* Order: Rank 2 (Left), Rank 1 (Center/Top), Rank 3 (Right) */}
          {/* We map manually or sort to ensure visual hierarchy if needed. 
              Here we just map the array which is already sorted 2-1-3 for visual balance. */}
          {topTravelers.map((traveler) => (
            <TravelerCard key={traveler.id} data={traveler} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TravelerCard({ data }: { data: (typeof topTravelers)[0] }) {
  const isChampion = data.rank === 1;

  return (
    <div className={`relative group ${isChampion ? "md:-mt-8 z-10" : ""}`}>
      {/* Rank Badge (Absolute) */}
      <div
        className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white
        ${
          data.rank === 1
            ? "bg-amber-400"
            : data.rank === 2
            ? "bg-slate-400"
            : "bg-orange-400"
        }
      `}
      >
        #{data.rank}
      </div>

      <Card
        className={`text-center overflow-visible border-slate-200 transition-all duration-300 hover:shadow-xl hover:border-primary/20
        ${
          isChampion
            ? "border-amber-200 shadow-amber-100/50 shadow-lg scale-105"
            : ""
        }
      `}
      >
        {/* Decorative Background for Card Header */}
        <div
          className={`h-24 rounded-t-xl w-full absolute top-0 left-0 -z-10
          ${
            isChampion
              ? "bg-gradient-to-b from-amber-50 to-transparent"
              : "bg-gradient-to-b from-slate-50 to-transparent"
          }
        `}
        />

        <CardContent className="pt-12 pb-8 px-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <Avatar
              className={`w-24 h-24 border-4 ${
                isChampion ? "border-amber-100" : "border-white"
              } shadow-md`}
            >
              <AvatarImage
                src={data.image}
                alt={data.name}
                className="object-cover"
              />
              <AvatarFallback>{data.name[0]}</AvatarFallback>
            </Avatar>
            {/* Verified Icon */}
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm text-blue-500">
              <CheckCircle className="w-5 h-5 fill-blue-500 text-white" />
            </div>
          </div>

          {/* User Info */}
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {data.name}
          </h3>
          <p className="text-sm text-slate-500 font-medium mb-3">
            {data.username}
          </p>

          <div className="flex items-center gap-1 text-slate-500 text-sm mb-6">
            <MapPin className="w-4 h-4" /> {data.location}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="flex items-center justify-center gap-1 font-bold text-slate-900">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />{" "}
                {data.rating}
              </div>
              <p className="text-xs text-slate-500">{data.reviews} reviews</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <div className="font-bold text-slate-900">{data.tripsLed}</div>
              <p className="text-xs text-slate-500">Trips Hosted</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {data.badges.map((badge) => (
              <Badge
                key={badge}
                variant="secondary"
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-normal"
              >
                {badge}
              </Badge>
            ))}
          </div>

          {/* Action Button */}
          <Button
            variant={isChampion ? "default" : "outline"}
            className={`w-full gap-2 ${
              isChampion
                ? "bg-primary text-white shadow-primary/25 shadow-lg"
                : ""
            }`}
          >
            <UserPlus className="w-4 h-4" /> Connect
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
