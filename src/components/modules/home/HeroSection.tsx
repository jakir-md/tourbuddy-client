"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* 1. Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="container relative z-10 px-4 pt-20 flex flex-col items-center gap-10">
        {/* 2. Hero Text Content */}
        <div className="text-center max-w-3xl space-y-6">
          <div className="flex items-center justify-center gap-2 animate-fade-in-up">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              #1 Travel Community in 2025
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
            Don't Just Travel. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Travel Together.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Stop waiting for your friends to get free. Find compatible travel
            buddies, split costs, and create memories that last a lifetime.
          </p>
        </div>

        {/* 3. The Search Widget (Glassmorphism) */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl">
          <div className="bg-white rounded-xl p-4 md:p-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Input: Destination */}
            <div className="md:col-span-4 relative group">
              <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Where
                  </label>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none p-0"
                  />
                </div>
              </div>
            </div>

            {/* Separator (Desktop) */}
            <div className="hidden md:block w-px h-10 bg-slate-200 mx-auto" />

            {/* Input: Date */}
            <div className="md:col-span-3 relative group">
              <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
                <Calendar className="w-5 h-5 text-slate-400 mr-3" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    When
                  </label>
                  <input
                    type="date"
                    className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 focus:outline-none p-0"
                  />
                </div>
              </div>
            </div>

            {/* Separator (Desktop) */}
            <div className="hidden md:block w-px h-10 bg-slate-200 mx-auto" />

            {/* Input: Type */}
            <div className="md:col-span-3 relative group">
              <div className="flex items-center px-4 py-2 bg-slate-50 rounded-lg border border-transparent group-focus-within:border-primary group-focus-within:bg-white transition-all">
                <Users className="w-5 h-5 text-slate-400 mr-3" />
                <div className="flex flex-col w-full">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Travelers
                  </label>
                  <select className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 focus:outline-none p-0 appearance-none">
                    <option>Solo Traveler</option>
                    <option>Couple</option>
                    <option>Group of Friends</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <Button
                size="lg"
                className="w-full h-14 md:h-12 bg-primary hover:bg-primary/90 text-lg shadow-lg shadow-primary/30"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* 4. Social Proof / Trust Signals */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-white/80 mt-4">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} className="border-2 border-black w-10 h-10">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-black flex items-center justify-center text-xs font-bold text-white">
              2k+
            </div>
          </div>
          <div className="text-sm font-medium">
            <p>
              Join{" "}
              <span className="text-white font-bold">2,500+ travelers</span>{" "}
              active today.
            </p>
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <span className="text-slate-300 ml-1">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
