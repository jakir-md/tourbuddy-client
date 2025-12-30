"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowRight, Plane } from "lucide-react";

interface TripData {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  slug: string;
  bannerImage: string;
  approveStatus: string;
}

export default function UpcomingTrip({ trip }: { trip: TripData | null }) {
  if (!trip) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        Your Next Adventure
      </h2>

      <Link href={`/trips/${trip.slug}`} className="block group">
        <Card className="overflow-hidden p-0 border-slate-200 shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-200">
          <div className="relative h-48 sm:h-64 w-full">
            {/* Background Image */}
            <Image
              src={trip.bannerImage}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 text-slate-900 hover:bg-white backdrop-blur-sm">
                {trip.approveStatus}
              </Badge>
            </div>

            {/* Bottom Content (Title & Timer) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-200 transition-colors">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {trip.startDate} to {trip.endDate}
                    </span>
                  </div>
                </div>

                {/* THE TIMER COMPONENT */}
                <div className="shrink-0">
                  <TripTimer
                    startDate={trip.startDate}
                    endDate={trip.endDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

// ⏱️ INTERNAL TIMER LOGIC
function TripTimer({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [status, setStatus] = useState<"UPCOMING" | "ONGOING" | "ENDED">(
    "UPCOMING"
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const now = new Date();
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T23:59:59`);

      if (now > end) {
        setStatus("ENDED");
      } else if (now >= start && now <= end) {
        setStatus("ONGOING");
      } else {
        setStatus("UPCOMING");
        const diff = start.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        setTimeLeft(`${days}d ${hours}h ${mins}m`);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  if (!mounted) return null;

  if (status === "ENDED") {
    return (
      <Badge variant="secondary" className="bg-slate-700 text-white">
        Trip Completed
      </Badge>
    );
  }

  if (status === "ONGOING") {
    return (
      <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-500/50 rounded-lg px-4 py-2 text-green-300 animate-pulse">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="font-bold text-sm tracking-wide">HAPPENING NOW</span>
      </div>
    );
  }

  // Upcoming Countdown
  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
      <Clock className="w-4 h-4 text-blue-400" />
      <div className="flex flex-col items-start">
        <span className="text-[10px] uppercase text-slate-400 font-bold leading-none mb-0.5">
          Starts In
        </span>
        <span className="font-mono font-bold text-white leading-none">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
