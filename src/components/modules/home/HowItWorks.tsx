"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ShieldCheck, 
  Map, 
  Users, 
  BadgePlus, 
  Wallet 
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How TravelBuddy Works
          </h2>
          <p className="text-slate-500 text-lg">
            Whether you want to explore new places or lead the journey, we make it simple and safe.
          </p>
        </div>

        {/* The Tabs */}
        <Tabs defaultValue="traveler" className="w-full max-w-5xl mx-auto">
          
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 h-12 rounded-full p-1 bg-slate-100">
              <TabsTrigger 
                value="traveler" 
                className="rounded-full text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                I want to Travel
              </TabsTrigger>
              <TabsTrigger 
                value="host" 
                className="rounded-full text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                I want to Host
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ✈️ TRAVELER FLOW */}
          <TabsContent value="traveler" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-3 gap-8 relative">
              
              {/* Connecting Line (Desktop Only) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 -z-10" />

              <StepCard 
                number="01"
                icon={Search}
                title="Discover Trips"
                desc="Browse unique itineraries created by local experts and community leaders. Filter by budget, date, or vibe."
              />
              <StepCard 
                number="02"
                icon={ShieldCheck}
                title="Verify & Book"
                desc="Submit your ID for verification. Once approved, book your seat securely. Safety is our #1 priority."
              />
              <StepCard 
                number="03"
                icon={Map}
                title="Travel Together"
                desc="Meet your host and fellow travelers at the pickup point. Enjoy a hassle-free journey and make new friends."
              />
            </div>
          </TabsContent>

          {/* 🎤 HOST FLOW */}
          <TabsContent value="host" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-3 gap-8 relative">
               {/* Connecting Line */}
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-50 -z-10" />

              <StepCard 
                number="01"
                icon={BadgePlus}
                title="Create a Trip"
                color="purple"
                desc="Design your perfect itinerary. Add photos, set the budget, and define the maximum group size."
              />
              <StepCard 
                number="02"
                icon={Users}
                title="Manage Requests"
                color="purple"
                desc="Review traveler profiles. You have full control to accept or reject booking requests based on your preferences."
              />
              <StepCard 
                number="03"
                icon={Wallet}
                title="Lead & Earn"
                color="purple"
                desc="Guide the group on an amazing adventure. Get paid securely through the platform after the trip completes."
              />
            </div>
          </TabsContent>

        </Tabs>

      </div>
    </section>
  );
}

// 🎨 Helper Component for Steps
function StepCard({ 
  number, 
  icon: Icon, 
  title, 
  desc, 
  color = "blue" 
}: { 
  number: string; 
  icon: any; 
  title: string; 
  desc: string; 
  color?: "blue" | "purple";
}) {
  
  const bgColors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100"
  };

  return (
    <div className="flex flex-col items-center text-center group">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg relative ${bgColors[color]} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="w-10 h-10" />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}