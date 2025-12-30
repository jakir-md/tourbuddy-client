"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Plane } from "lucide-react";

interface TripTimerProps {
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string; // Format: "YYYY-MM-DD"
}

export default function TripStatusTimer({
  startDate,
  endDate,
}: TripTimerProps) {
  // 1. Solve Hydration Error: Only render on client
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [status, setStatus] = useState<"UPCOMING" | "ONGOING" | "COMPLETED">(
    "UPCOMING"
  );

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const now = new Date();
      // Set times to midnight to ensure accurate day comparison
      const start = new Date(`${startDate}T00:00:00`);
      const end = new Date(`${endDate}T23:59:59`); // End of the end date

      // CASE 1: COMPLETED
      if (now > end) {
        setStatus("COMPLETED");
        return;
      }

      // CASE 2: ONGOING (Between Start and End)
      if (now >= start && now <= end) {
        setStatus("ONGOING");
        return;
      }

      // CASE 3: UPCOMING (Countdown to Start)
      setStatus("UPCOMING");
      const difference = start.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // Run immediately and then every second
    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  // Prevent server-side rendering mismatch
  if (!mounted) return null;

  // 🔴 RENDER: COMPLETED STATE
  if (status === "COMPLETED") {
    return (
      <Card className=" py-0 px-2 border-none rounded-md shadow-none bg-slate-50 border-slate-200">
        <CardContent className="flex items-center justify-between opacity-80">
          <div className="flex items-center gap-3">
            <div className="bg-slate-200 p-1 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-700">Trip Completed</h3>
              <p className="text-sm text-slate-500">This event has ended.</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-slate-200 text-slate-600">
            Ended on {endDate}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  // 🟢 RENDER: ONGOING STATE
  if (status === "ONGOING") {
    return (
      <Card className="py-0 px-2 border-none rounded-md shadow-none bg-green-50 border-green-200 animate-in fade-in">
        <CardContent className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full animate-pulse">
              <Plane className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-800">Happening Now!</h3>
              <p className="text-sm text-green-600">
                Pack your bags, the trip is live.
              </p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <Badge className="bg-green-600 hover:bg-green-700">
              Live Event
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 🔵 RENDER: COUNTDOWN STATE
  return (
    <div className="space-y-4">
      {/* <div className="flex items-center gap-2 text-slate-700 mb-2">
        <Clock className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-sm uppercase tracking-wide">
          Time until departure
        </span>
      </div> */}

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}

// Sub-component for the boxes
function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-white border rounded-lg flex flex-col items-center justify-center shadow-sm">
      <span className="text-xl sm:text-xl font-bold text-slate-900 tabular-nums">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[5px] sm:text-xs font-medium text-slate-500 uppercase mt-1">
        {label}
      </span>
    </div>
  );
}
