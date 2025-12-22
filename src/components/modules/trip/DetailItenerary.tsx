"use client";

import React from "react";
import {
  Utensils, // Food
  Camera, // Visit
  Bus, // Travel
  Bed, // Stay
  MapPin,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActivityType, ItineraryDay } from "@/types/trip.interface";
import Image from "next/image";

// Helper to get the right icon and color based on activity type
const getActivityConfig = (type: ActivityType) => {
  switch (type) {
    case "food":
      return {
        icon: Utensils,
        color: "text-orange-500",
        bg: "bg-orange-100",
        border: "border-orange-200",
      };
    case "travel":
      return {
        icon: Bus,
        color: "text-blue-500",
        bg: "bg-blue-100",
        border: "border-blue-200",
      };
    case "stay":
      return {
        icon: Bed,
        color: "text-indigo-500",
        bg: "bg-indigo-100",
        border: "border-indigo-200",
      };
    case "visit":
    default:
      return {
        icon: Camera,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
      };
  }
};

export default function DetailedItinerary({ days }: { days: ItineraryDay[] }) {
  const allDayIds = days.map((day) => `day-${day.day}`);
  return (
    <div className="max-w-7xl w-full space-y-6">
      {/* We use Accordion so users can collapse days they aren't interested in */}
      <Accordion
        type="multiple"
        defaultValue={allDayIds}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {days.map((day) => (
          <div className="flex gap-2">
            <AccordionItem
              key={day.day}
              value={`day-${day.day}`}
              className="rounded-md w-full px-4 bg-white shadow-sm"
            >
              {/* Day Header */}
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-900 text-white rounded-lg shrink-0">
                    <span className="text-[10px] font-medium uppercase opacity-70">
                      Day
                    </span>
                    <span className="text-xl font-bold leading-none">
                      {day.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {day.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {day.activities.length} stops • {day.date}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-6 pt-2">
                <div className="relative space-y-6">
                  <div className="absolute top-2 bottom-2 w-px bg-slate-200 -translate-x-1/2" />

                  {day.activities.map((activity, index) => {
                    const config = getActivityConfig(activity.type);
                    const Icon = config.icon;

                    return (
                      <div key={activity.id} className="relative flex group">
                        <div
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 bg-white shrink-0 shadow-sm transition-transform group-hover:scale-110 ${config.border}`}
                        >
                          <Icon className={`w-4 h-4 ${config.color}`} />
                        </div>
                        <Card className="flex-1 p-2 rounded-md border-slate-100 gap-0 hover:border-slate-300 transition-colors shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {activity.time && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs font-normal text-slate-500 h-5 px-1.5"
                                  >
                                    {activity.time}
                                  </Badge>
                                )}
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                  {activity.type}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-base">
                                {activity.title}
                              </h4>
                            </div>

                            <button className="text-slate-300 hover:text-slate-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {activity.location && (
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">
                                {activity.location}
                              </span>
                            </div>
                          )}

                          {activity.image && (
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
                              <img
                                src={activity.image}
                                className="rounded-md w-full"
                                height={100}
                                width={300}
                                alt=""
                              />
                            </div>
                          )}

                          {activity.description && (
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-md border border-slate-100/50">
                              {activity.description}
                            </p>
                          )}
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
