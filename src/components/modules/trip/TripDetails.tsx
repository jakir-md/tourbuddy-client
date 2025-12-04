"use client";

import React from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ShieldCheck,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TripDetailsView() {
  // Mock Data
  const trip = {
    title: "Backpacking through the Swiss Alps",
    destination: "Interlaken, Switzerland",
    dates: "12 Oct - 18 Oct 2025",
    days: 7,
    budget: 1200,
    description:
      "Join me for a week of hiking, fondue, and breathtaking views. We will stay in hostels and do moderate hikes daily. Looking for chill vibes!",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548577908-01297e5560ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=600&q=80",
    ],
    host: {
      name: "Alex Morgan",
      role: "Super Host",
      image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      isVerified: true,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {trip.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-600 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {trip.destination}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {trip.dates}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. Image Grid (Airbnb Style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-10">
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={trip.images[0]}
            className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            alt="Main"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1">
          <img
            src={trip.images[1]}
            className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            alt="Side 1"
          />
        </div>
        <div className="md:col-span-1 md:row-span-1">
          <img
            src={trip.images[2]}
            className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            alt="Side 2"
          />
        </div>
        <div className="md:col-span-2 md:row-span-1 relative">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
            className="w-full h-full object-cover"
            alt="Side 3"
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4"
          >
            View All Photos
          </Button>
        </div>
      </div>

      {/* 3. Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Trip Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border border-slate-200">
                <AvatarImage src={trip.host.image} />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg text-slate-900">
                  Hosted by {trip.host.name}
                </h3>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                  {trip.host.role}
                  {trip.host.isVerified && (
                    <ShieldCheck className="w-3 h-3 text-blue-500" />
                  )}
                </p>
              </div>
            </div>
            <Button variant="outline">View Profile</Button>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <Users className="w-5 h-5 text-slate-700 mb-2" />
              <p className="font-bold text-slate-900">Group Size</p>
              <p className="text-sm text-slate-500">4-6 People</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-slate-700 mb-2" />
              <p className="font-bold text-slate-900">Budget</p>
              <p className="text-sm text-slate-500">${trip.budget} est.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-700 mb-2" />
              <p className="font-bold text-slate-900">Type</p>
              <p className="text-sm text-slate-500">Hiking</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <Calendar className="w-5 h-5 text-slate-700 mb-2" />
              <p className="font-bold text-slate-900">Duration</p>
              <p className="text-sm text-slate-500">{trip.days} Days</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              About the trip
            </h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {trip.description}
            </p>
          </div>

          <Separator />

          {/* Itinerary Stub */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Itinerary</h3>
            <div className="space-y-6 pl-4 border-l-2 border-slate-200 ml-2">
              {[1, 2, 3].map((day) => (
                <div key={day} className="relative">
                  <div className="absolute -left-[21px] top-0 bg-white border-2 border-slate-300 w-4 h-4 rounded-full" />
                  <h4 className="font-bold text-slate-900">Day {day}</h4>
                  <p className="text-slate-500 text-sm">
                    Arrival, check-in, and evening city walk.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Sidebar (Booking) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="shadow-lg border-slate-200">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-bold text-slate-900">
                    ${trip.budget}
                  </span>
                  <span className="text-slate-500 text-sm">
                    estimated / person
                  </span>
                </div>

                <div className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Start Date</span>
                    <span className="font-medium text-slate-900">
                      12 Oct 2025
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">End Date</span>
                    <span className="font-medium text-slate-900">
                      18 Oct 2025
                    </span>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
                  Request to Join
                </Button>

                <p className="text-xs text-center text-slate-400">
                  You won't be charged yet. The host must approve your request
                  first.
                </p>

                <div className="flex justify-center pt-2">
                  <Button variant="link" className="text-slate-500 gap-2">
                    <MessageCircle className="w-4 h-4" /> Contact Host
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
