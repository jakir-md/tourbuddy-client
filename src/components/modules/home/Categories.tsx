"use client";

import React from "react";
import Link from "next/link";
import {
  Mountain,
  Palmtree,
  Building2,
  Utensils,
  Tent,
  Car,
  Camera,
  Briefcase,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "ADVENTURE",
    label: "Adventure",
    icon: Mountain,
    count: 120,
    color: "text-emerald-600",
    bg: "bg-emerald-50 group-hover:bg-emerald-100",
    desc: "Hiking & trekking", // Shortened for compact view
  },
  {
    id: "BEACH",
    label: "Beaches",
    icon: Palmtree,
    count: 85,
    color: "text-blue-500",
    bg: "bg-blue-50 group-hover:bg-blue-100",
    desc: "Sun & sand",
  },
  {
    id: "CULTURAL",
    label: "Cultural",
    icon: Building2,
    count: 240,
    color: "text-amber-600",
    bg: "bg-amber-50 group-hover:bg-amber-100",
    desc: "Heritage tours",
  },
  {
    id: "FOOD",
    label: "Foodie",
    icon: Utensils,
    count: 64,
    color: "text-orange-500",
    bg: "bg-orange-50 group-hover:bg-orange-100",
    desc: "Local cuisine",
  },
  {
    id: "CAMPING",
    label: "Camping",
    icon: Tent,
    count: 42,
    color: "text-green-600",
    bg: "bg-green-50 group-hover:bg-green-100",
    desc: "Nature escapes",
  },
  {
    id: "ROADTRIP",
    label: "Road Trip",
    icon: Car,
    count: 35,
    color: "text-indigo-500",
    bg: "bg-indigo-50 group-hover:bg-indigo-100",
    desc: "Scenic drives",
  },
  {
    id: "PHOTOGRAPHY",
    label: "Photo",
    icon: Camera,
    count: 28,
    color: "text-pink-500",
    bg: "bg-pink-50 group-hover:bg-pink-100",
    desc: "Scenic spots",
  },
  {
    id: "BUSINESS",
    label: "Work",
    icon: Briefcase,
    count: 15,
    color: "text-slate-600",
    bg: "bg-slate-50 group-hover:bg-slate-100",
    desc: "Digital nomads",
  },
];

export default function BrowseCategories() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Categories 🎒
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-xl">
              Find the perfect vibe for your next journey.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/explore?category=${category.id}`}
              className="group block"
            >
              <Card className="h-full p-4 transition-all duration-300 hover:shadow-md border-slate-100 hover:border-slate-200 relative overflow-hidden">
                {/* Background Decoration (Hidden on mobile to save space, visible on hover) */}
                <div
                  className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 ${category.bg}`}
                />

                <div className="relative z-10 flex flex-col items-start gap-3">
                  {/* Icon Wrapper: Smaller on mobile */}
                  <div
                    className={`p-2 md:p-3 rounded-lg ${category.bg} transition-colors duration-300`}
                  >
                    <category.icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${category.color}`}
                    />
                  </div>

                  <div className="space-y-1 w-full">
                    {/* Title: Smaller font */}
                    <h3 className="font-bold text-sm md:text-lg text-slate-900 group-hover:text-primary transition-colors">
                      {category.label}
                    </h3>
                    {/* Desc: Tiny font, hidden on very small screens if needed */}
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {category.desc}
                    </p>
                  </div>

                  {/* Footer: Compact Count */}
                  <div className="w-full pt-2 border-t border-slate-50 mt-1">
                    <span className="text-[10px] md:text-xs font-medium text-slate-400">
                      {category.count}+ Trips
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-between  mt-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Season's Best
          </h1>
          <Link href="/explore">
            <Button
              variant="outline"
              className="hover:cursor-pointer md:flex gap-2"
            >
              Explore All <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
