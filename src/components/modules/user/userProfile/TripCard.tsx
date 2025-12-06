"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface TripProps {
  trip: {
    id: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    type: string;
    photos: string[];
  };
}

export default function TripCard({ trip }: TripProps) {
  // Format Date Range
  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dateRange = `${formatDate(trip.startDate)} - ${formatDate(
    trip.endDate
  )}`;

  return (
    <Link href={`/trips/${trip.id}`} className="block group">
      <Card className="flex flex-col sm:flex-row overflow-hidden border-slate-200 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300">
        {/* 1. Image Section (Left on Desktop, Top on Mobile) */}
        <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 relative bg-slate-100">
          <img
            src={trip.photos[0] || "/placeholder.jpg"}
            alt={trip.destination}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Mobile-only Badge overlay for space saving */}
          <div className="absolute top-3 left-3 sm:hidden">
            <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm hover:bg-white">
              {trip.type}
            </Badge>
          </div>
        </div>

        {/* 2. Info Section (Right) */}
        <div className="flex flex-col justify-center p-5 w-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="hidden sm:flex mb-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-normal text-slate-500 bg-slate-100"
                >
                  {trip.type}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {trip.destination}
              </h3>
            </div>
            <span className="text-lg font-bold text-emerald-600">
              ${trip.budget}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {dateRange}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto flex items-center justify-end">
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Details <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
