"use client";

import Link from "next/link";
import { MapPin, Users, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock Data: In reality, you fetch this via:
// prisma.trip.groupBy({ by: ['destination'], _count: true, orderBy: { _count: 'desc' } })
const destinations = [
  {
    id: 1,
    city: "Bali",
    country: "Indonesia",
    // Reliable Bali Image
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    activeTrips: 120,
    size: "large",
  },
  {
    id: 2,
    city: "Kyoto",
    country: "Japan",
    // Reliable Kyoto Image
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    activeTrips: 85,
    size: "tall",
  },
  {
    id: 3,
    city: "Cox's Bazar",
    country: "Bangladesh",
    // WORKING Cox's Bazar Image (Boats on the beach)
    image:
      "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80",
    activeTrips: 240,
    size: "normal",
  },
  {
    id: 4,
    city: "Santorini",
    country: "Greece",
    // NEW Reliable Link (Classic Blue Domes - High Availability)
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    activeTrips: 65,
    size: "normal",
  },
  {
    id: 5,
    city: "Reykjavik",
    country: "Iceland",
    // Reliable Iceland Image
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80",
    activeTrips: 42,
    size: "wide",
  },
];

export default function TopDestinations() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Trending Destinations 🌍
            </h2>
            <p className="text-slate-600 text-lg">
              Most popular places where our community is traveling right now.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2">
            View All Locations <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} data={dest} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full">
            View All Locations
          </Button>
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual cards
function DestinationCard({ data }: { data: any }) {
  // Determine grid classes based on "size" prop
  const gridClasses = {
    large: "md:col-span-2 md:row-span-2",
    tall: "md:col-span-1 md:row-span-2",
    wide: "md:col-span-2 md:row-span-1",
    normal: "md:col-span-1 md:row-span-1",
  };

  return (
    <Link
      href={`/explore?destination=${data.city}`}
      className={`relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ${
        gridClasses[data.size as keyof typeof gridClasses]
      }`}
    >
      {/* Background Image with Zoom Effect */}
      <img
        src={data.image}
        alt={data.city}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Badge */}
        <div className="flex justify-between items-start">
          <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-0">
            <Users className="w-3 h-3 mr-1" /> {data.activeTrips} Trips
          </Badge>

          {/* Arrow Icon (Appears on Hover) */}
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-md opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-slate-300 text-sm font-medium uppercase tracking-wider mb-1">
            {data.country}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors">
            {data.city}
          </h3>
        </div>
      </div>
    </Link>
  );
}
