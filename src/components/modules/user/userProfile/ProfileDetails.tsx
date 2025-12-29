"use client";

import React from "react";
import { ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileProps {
  user: {
    id: string;
    name: string;
    profilePhoto: string | null;
    role: string;
    isVerified: boolean;
    bio: string | null;
    age: number | null;
    gender: string | null;
    interests: string[];
    createdAt: Date;
    _count: { tripsCreated: number; reviewsReceived: number };
  };
}

export default function ProfileDetails({ user }: ProfileProps) {
  return (
    <Card className="border-slate-200 pt-0 shadow-sm overflow-hidden">
      {/* Cover Banner (Aesthetic) */}
      <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500" />

      <CardContent className="relative px-6 pb-6">
        <div className="flex flex-col md:flex-row gap-6 -mt-12 items-start">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage
                src={user?.profilePhoto || ""}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl">
                {user?.name[0]}
              </AvatarFallback>
            </Avatar>
            {user?.isVerified && (
              <div
                className="absolute bottom-2 right-2 bg-white p-1.5 rounded-full shadow-sm"
                title="Verified ID"
              >
                <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-500 text-white" />
              </div>
            )}
          </div>

          {/* Info Block */}
          <div className="flex-1 pt-2 md:pt-14 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {user?.name}
                  {user?.role === "ADMIN" && (
                    <Badge variant="destructive">Admin</Badge>
                  )}
                </h1>
                <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                  <span>{user?.age || 20} Years</span> •{" "}
                  <span>{user?.gender || "Male"}</span> •{" "}
                  <span>
                    Member since {new Date(user.createdAt).getFullYear()}
                  </span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100 min-w-[80px]">
                  <p className="text-xl font-bold text-slate-900">
                    {user?._count?.tripsCreated || 20}
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase">
                    Trips
                  </p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100 min-w-[80px]">
                  <p className="text-xl font-bold text-slate-900">
                    {user?._count?.reviewsReceived || 10}
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase">
                    Reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            {user?.bio && (
              <p className="text-slate-600 leading-relaxed max-w-2xl">
                {user.bio}
              </p>
            )}

            {/* Interests */}
            {/* <div className="flex flex-wrap gap-2 pt-2">
              {user?.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  {interest}
                </Badge>
              ))}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
