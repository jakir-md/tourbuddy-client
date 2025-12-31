"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ShieldCheck,
  MessageCircle,
  Share2,
  Heart,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BookingCard from "./JoinRequestCard";
import { requestForJoining } from "@/services/joinRequest/joinRequest";
import DetailedItinerary from "./DetailItenerary";
import TripActionGatekeeper from "@/components/shared/TripActionGateKeeper";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import { ItineraryDay } from "@/types/trip.interface";

// 1. Type Definitions based on your provided Data
interface User {
  id: string;
  name: string;
  profilePhoto: string;
  isVerified: boolean;
}

type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | null;

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

interface TripData {
  id: string;
  budget: number;
  photos: string[];
  startDate: string; // ISO Date String
  endDate: string; // ISO Date String
  activities: string[];
  itinerary: any; // JSON string from DB
  type: string;
  destination: string;
  title?: string; // Optional if not in DB, can derive or use placeholder
  description?: string; // Add this to your schema if missing
  user: User; // Host // NEW: Array of users who joined
}

interface IJoinedUsers {
  attendee: {
    id: string;
    name: string;
    profilePhoto: string;
    isVerified: boolean;
  };
}

export default function TripDetails({
  trip,
  requestStatus,
  loginUserId,
  joinedUsers = [],
}: {
  trip: TripData;
  loginUserId: string;
  requestStatus: RequestStatus;
  joinedUsers: IJoinedUsers[];
}) {
  const [user, setUser] = useState<IUserInfo | null>(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const result = await getUserInfo();
      console.log("user info from trip", result);
      setUser(result);
    };
    loadData();
  }, []);

  const handleRequest = async () => {
    setIsProcessing(false);
    await requestForJoining(trip.id, trip.user.id);
    setIsProcessing(true);
  };

  // 2. Data Parsing & Formatting
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate duration
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const durationDays =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Parse Itinerary safely
  let itineraryList: ItineraryDay[] = [];
  try {
    itineraryList = trip.itinerary;
  } catch (e) {
    console.error("Failed to parse itinerary", e);
  }

  const isLoggedIn = !!user;
  let isVerified;

  if (isLoggedIn) {
    isVerified = user?.isVerified;
  }

  return (
    <div className="container mx-auto px-2 py-8 animate-in fade-in duration-500">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className="bg-slate-100 text-slate-700 font-medium"
            >
              {trip.type} Trip
            </Badge>
            {trip.activities.map((act, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-slate-500 font-normal border-slate-200"
              >
                {act.trim()}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
            {trip.title || `Trip to ${trip.destination}`}
          </h1>
          <div className="flex items-center gap-4 text-slate-600 text-sm">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600" /> {trip.destination}
            </span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-emerald-600" />
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="hover:bg-slate-50">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-red-500 hover:bg-red-50"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-xl overflow-hidden mb-10 shadow-sm border border-slate-100">
        <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
          <img
            src={trip.photos[0] || "/placeholder-travel.jpg"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Main location"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>

        <div className="md:col-span-1 md:row-span-1 hidden md:block relative group cursor-pointer">
          <img
            src={trip.photos[1] || trip.photos[0]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Side 1"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1 hidden md:block relative group cursor-pointer">
          <img
            src={trip.photos[2] || trip.photos[0]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Side 2"
          />
        </div>

        <div className="md:col-span-2 md:row-span-1 relative cursor-pointer group">
          <img
            src={trip.photos[3] || trip.photos[0]}
            className="w-full h-full object-cover blur-[2px] group-hover:blur-none transition-all duration-500"
            alt="More"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
            <Button variant="secondary" className="gap-2 font-semibold">
              View All Photos
            </Button>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT GRID */}
      <div>
        {/* LEFT COLUMN (Details) */}
        <div className=" space-y-10">
          {/* Host Info */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-8">
            <Link
              href={`/profile/${trip.user.id}`}
              className="group flex items-center gap-4"
            >
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-slate-100 group-hover:border-emerald-200 transition-colors">
                  <AvatarImage
                    src={trip.user.profilePhoto}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg bg-slate-100 text-slate-600">
                    {trip.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {trip.user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-500 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Hosted by {trip.user.name}
                </h3>
                <p className="text-slate-500 text-sm">
                  Joined in 2024 • Response rate 100%
                </p>
              </div>
            </Link>
            <Link href={`/profile/${trip.user.id}`}>
              <Button
                variant="outline"
                className="hidden sm:flex hover:cursor-pointer"
              >
                View Profile
              </Button>
            </Link>
          </div>

          {/* Key Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Users} label="Group Size" value="4-6 People" />
            <StatCard
              icon={DollarSign}
              label="Budget"
              value={`$${trip.budget}`}
              sub="estimated"
            />
            <StatCard icon={MapPin} label="Type" value={trip.type} />
            <StatCard
              icon={Calendar}
              label="Duration"
              value={`${durationDays} Days`}
            />
          </div>

          {/* NEW SECTION: Joined Travelers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Already Joined
              </h3>
              <span className="text-sm text-slate-500">
                {joinedUsers.length} joined
              </span>
            </div>

            <div className="flex flex-wrap gap-6">
              {joinedUsers.map((buddy) => (
                <TooltipProvider key={buddy.attendee.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/profile/${buddy.attendee.id}`}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-transparent group-hover:border-emerald-400 transition-all cursor-pointer">
                            <AvatarImage src={buddy.attendee.profilePhoto} />
                            <AvatarFallback>
                              {buddy.attendee.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          {buddy.attendee.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-700 max-w-[60px] truncate text-center">
                          {buddy.attendee.name.split(" ")[0]}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View {buddy.attendee.name}'s Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}

              {/* Empty State / Call to Action Placeholder */}
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="h-14 w-14 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 text-slate-400">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-400">You?</span>
              </div>
            </div>
          </div>

          <Separator />
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              About the trip
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {trip.description ||
                "No description provided. Contact the host for more details!"}
            </p>
          </div>

          <DetailedItinerary days={itineraryList} />
        </div>
        <div className="mt-5">
          {!isLoggedIn || !isVerified ? (
            <TripActionGatekeeper
              isLoggedIn={isLoggedIn}
              isVerified={isVerified}
            />
          ) : (
            <div>
              {trip.user.id !== loginUserId && (
                <BookingCard
                  trip={{
                    budget: trip.budget,
                    endDate: trip.endDate,
                    startDate: trip.startDate,
                  }}
                  onRequestJoin={handleRequest}
                  requestStatus={requestStatus}
                  isProcessing={isProcessing}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Small Helper Component for Stats
function StatCard({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-start gap-3 hover:bg-white hover:shadow-md transition-all">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="font-bold text-slate-900 mt-0.5">{value}</p>
        {sub && <p className="text-[10px] text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}
